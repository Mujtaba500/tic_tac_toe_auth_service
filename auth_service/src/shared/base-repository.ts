import {
  ANY,
  Filter,
  Options,
  SequelizeTransaction,
  Where
} from '../shared/types/index.js';

export interface BaseRepositoryI<T> {
  bulkCreate(data: T[]): Promise<T[]>;
  create(data: T): Promise<T>;
  destroy<K>(id?: number | null, where?: Where): Promise<K | null>;
  exists(identifier?: number | null, where?: Where): Promise<boolean>;
  findAll(filter?: Filter, options?: Options): Promise<T[] | null>;
  findById(identifier: number): Promise<T | null>;
  update<K>(id: number, obj: K): Promise<K | null>;
}

export abstract class BaseRepository<T> implements BaseRepositoryI<T> {
  public constructor(private readonly model: ANY) {}

  public async executeRawQuery<K>(sql: ANY): Promise<K | ANY> {
    return this.model.sequelize.query(sql);
  }

  public async bulkCreate<K>(
    data: K[],
    transaction?: SequelizeTransaction
  ): Promise<K[]> {
    return this.model.bulkCreate(data, { transaction });
  }

  public async bulkUpdate<K>(
    data: K[],
    transaction: SequelizeTransaction,
    fields: string[],
    updateOnDuplicate: string[]
  ): Promise<K[]> {
    return this.model.bulkCreate(data, {
      fields,
      updateOnDuplicate,
      transaction
    });
  }

  public async count(
    column: ANY,
    where?: Where,
    include?: ANY
  ): Promise<number> {
    return this.model.count({
      col: column,
      where: { ...where },
      distinct: true,
      ...include
    });
  }

  public async create<K>(
    data: K,
    transaction?: SequelizeTransaction
  ): Promise<K> {
    return this.model.create(data, { transaction });
  }

  public async destroy<K>(
    id?: number | null,
    _where?: Where,
    transaction?: SequelizeTransaction
  ): Promise<K | null> {
    if (!id || !_where) {
      return null;
    }
    const where: Where = id ? { id } : _where;
    return this.model.destroy({ where, transaction });
  }

  public async exists(id?: number | null, _where?: Where): Promise<boolean> {
    if (id) {
      const task: T | null = await this.findById<T>(id);
      return task && Object.keys(task).length ? true : false;
    }

    const tasks: T[] | null = await this.findAll(_where);
    return tasks && tasks.length ? true : false;
  }

  public async findAll<K>(
    filter?: Filter,
    options?: Options,
    transaction?: SequelizeTransaction
  ): Promise<K[] | null> {
    return this.model.findAll({
      where: { ...filter },
      ...options,
      transaction
    });
  }

  public async findById<K>(
    identifier: number,
    options?: Options,
    transaction?: SequelizeTransaction
  ): Promise<K | null> {
    return this.model.findByPk(identifier, { ...options, transaction });
  }

  public async findOne<K>(
    projections: { [key: string]: number | string | null | ANY },
    options?: Options,
    transaction?: SequelizeTransaction
  ): Promise<K | null> {
    return this.model.findOne({
      where: { ...projections },
      ...options,
      transaction
    });
  }

  public async update<K>(
    id: number,
    obj: K,
    transaction?: SequelizeTransaction,
    options = {}
  ): Promise<K | null> {
    const [number] = await this.model.update(
      { ...obj },
      { where: { id }, individualHooks: true, transaction, ...options }
    );
    return number ? this.findById(id) : null;
  }
  public async updateByColumnMatched<K>(
    target: { [key: string]: number[] | unknown },
    obj: { [key: string]: unknown },
    transaction?: SequelizeTransaction
  ): Promise<K[] | null> {
    const [number] = await this.model.update(
      { ...obj },
      { where: { ...target }, individualHooks: true, transaction }
    );

    return number;
  }

  public async updateByReferenceIds<K>(
    ids: { [key: string]: number[] | unknown },
    obj: { [key: string]: unknown },
    transaction?: SequelizeTransaction
  ): Promise<K[] | null> {
    const [number] = await this.model.update(
      { ...obj },
      { where: { ...ids }, individualHooks: true, transaction }
    );

    return number ? this.model.findAll({ where: { ...ids } }) : null;
  }
}

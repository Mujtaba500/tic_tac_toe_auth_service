import * as Sequelize from 'sequelize';

export type SequelizeTransaction = Sequelize.Transaction;

export interface LoginReqI {
  email: string;
  ip?: string;
  user_agent?: string;
  lat: number;
  long: number;
  password: string;
  specialityKey: string;
  change_password: number;
  request_from_ios: boolean;
}
export interface UpdatePasswordReqI {
  new_password: string;
  old_password: string;
  user_id?: number;
}

export interface GenericWhereClauseI {
  deleted_at?: string;
  email?: string;
  id?: number;
}
export interface TokenI {
  sub?: number;
  user_id?: number;
  role?: {
    id?: number;
    slug?: string;
    name?: string;
  };
  info?: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
  };
  specialty?: string;
  medium?: string;
}

export interface DecodedTokenI {
  header: DecodedTokenHeaderI;
  payload: DecodedTokenPayloadI;
  signature: string;
}

export interface DecodedTokenPayloadI {
  apiKey?: string;
  exp: number;
  iat: number;
  iss: string;
  sub: number;
  user_id?: number;
}
export interface DecodedTokenHeaderI {
  alg: string;
  typ: string;
}

export interface Paginate {
  page?: number;
  paginate?: number;
}

export interface GeneralResponseDataI<I> {
  data: unknown[] | I;
  total?: number;
}

export interface GeneralApiResponseI<I> {
  message: string;
  result: GeneralResponseDataI<I>;
  status: boolean;
}

export interface Filter {
  /** Where clause */
  [key: string]: ANY;
}

export interface Where {
  [key: string]: ANY;
}

export interface Options {
  [key: string]: ANY;
}

export interface Paginate {
  page?: number;
  paginate?: number;
}

export interface AuthorizationI {
  Authorization: string;
  'user-id': string;
  request_from_ios?: boolean;
  'request-from-ios'?: boolean;
  preferred_language?: string;
}

export interface GenericQueryParamsI {
  [key: string]: number | string | null | undefined | [string | number];
}

export interface GenericHeadersI {
  [key: string]: ANY;
  data?: ANY;
  headers?: AuthorizationI;
  params?: GenericQueryParamsI;
}

export type GenericReqObjI = ANY;
export interface GenericMultipartReqObjI {
  [key: string]: ANY;
}
export interface GeneralResponseDataI<I> {
  data: unknown[] | I;
  total?: number;
}

export interface GeneralApiResponseI<I> {
  message: string;
  result: GeneralResponseDataI<I>;
  status: boolean;
}

export interface AuditTrailMetaI {
  audit_trail_user_id?: string;
  audit_trail_date?: string;
  audit_trail_role?: string;
  audit_trail_info?: string;
  audit_trail_ip?: string;
  audit_trail_parameter?: string;
  audit_trail_description?: string;
  audit_trail_meta_id?: any;
  audit_trail_action?: string;
  audit_trail_medium?: string;
  statusCode?: string;
  responseType?: string;
}

export type ANY = any;

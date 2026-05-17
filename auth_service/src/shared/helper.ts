import { ANY } from './types';

export class helper {
  public sendServerResponse = (
    success: boolean,
    statusCode: number,
    res: ANY,
    message?: string | null,
    data?: ANY,
    errorMessge? : string
  ) => {
    const response: { success: boolean; message?: string; data?: ANY[], error? : string } = {
      success
    };

    if (message) {
      response.message = message;
    }

    if (data) {
      response.data = data;
    }

    if (errorMessge) {
      response.error = errorMessge;
    }

    return res.status(statusCode).json(response);
  };

  protected shallowCopy = <T>(data: T): T => JSON.parse(JSON.stringify(data));

  protected convertToString = (data: ANY) => data.toString();
}

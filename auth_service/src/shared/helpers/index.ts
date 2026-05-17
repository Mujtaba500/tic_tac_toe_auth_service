import { ANY } from '../types/types.js';

const sendServerResponse = (
  success: boolean,
  statusCode: number,
  res: ANY,
  message?: string,
  data?: ANY,
  errorMessage? : string
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

    if (errorMessage) {
      response.error = errorMessage;
    }

    return res.status(statusCode).json(response);
};

export { sendServerResponse };

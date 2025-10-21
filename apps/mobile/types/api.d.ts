
export interface IResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}



export interface IResponseArray<T> {
  success: boolean;
  data?: T[];
  message?: string;
  error?: string;
  statusCode?: number;
}


export interface IErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

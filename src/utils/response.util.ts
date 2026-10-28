export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export class ResponseUtil {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return { success: true, message, data };
  }
  static error(message: string, error?: string): ApiResponse<null> {
    return { success: false, message, error };
  }
}
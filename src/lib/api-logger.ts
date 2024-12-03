export const logAPIRequest = (endpoint: string, method: string, data?: any) => {
  console.log(`[API] ${method} ${endpoint} Request:`, {
    timestamp: new Date().toISOString(),
    data,
  });
};

export const logAPIResponse = (endpoint: string, method: string, status: number, data?: any, error?: any) => {
  console.log(`[API] ${method} ${endpoint} Response:`, {
    timestamp: new Date().toISOString(),
    status,
    data,
    error,
  });
};

export const logAPIError = (endpoint: string, method: string, error: any) => {
  console.error(`[API] ${method} ${endpoint} Error:`, {
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? {
      message: error.message,
      stack: error.stack,
    } : error,
  });
};

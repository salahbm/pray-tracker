export class ApiError<T = unknown> extends Error {
  public status: number;
  public details?: T;

  constructor(message: string, status: number, details?: T) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return new Response(
      JSON.stringify({
        status: error.status,
        message: error.message,
        details: error.details || null,
      }),
      { status: error.status },
    );
  }

  return new Response(
    JSON.stringify({
      status: 500,
      message: 'An unexpected error occurred',
    }),
    { status: 500 },
  );
}

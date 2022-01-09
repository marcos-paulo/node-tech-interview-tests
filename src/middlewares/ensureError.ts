import { NextFunction, Request, Response } from "express";

export function ensureError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    console.error(err.stack);
    return response.status(400).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}

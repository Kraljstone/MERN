export interface ErrorHandler {
  name: string;
  message: string;
  kind: string;
  stack?: string;
}
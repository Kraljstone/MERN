import { Request } from 'express';
export interface ExtendedUserRequest extends Request {
  user?: any;
}

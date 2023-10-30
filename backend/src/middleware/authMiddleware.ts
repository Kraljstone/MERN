import { Request, Response, NextFunction } from 'express';
import { CustomJwtPayload } from './authMiddleware.interface';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { ExtendedUserRequest } from '../interfaces/extendedUserRequest.interface';

export const protect = asyncHandler(
  async (req: ExtendedUserRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as CustomJwtPayload;

        req.user = await User.findById(decoded.userID).select('-password');

        return next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, Invalid Token');
      }
    }

    res.status(401);
    throw new Error('Not authorized, no token');
  }
);

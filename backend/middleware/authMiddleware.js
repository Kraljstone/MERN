import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userID).select('-password');

      return next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, Invalid Token');
    }
  }

  res.status(401);
  throw new Error('Not authorized, no token');
});

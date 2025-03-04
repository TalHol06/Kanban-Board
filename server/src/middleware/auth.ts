import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token){
    return res.status(401).json({ message: 'No token provided' });
  }

  try{
    const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = decodedToken;
    return next();
  } catch (err: any){
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

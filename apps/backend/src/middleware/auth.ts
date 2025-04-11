// import type { Request, Response, NextFunction } from 'express';
// import { createResponse, MessageCodes, StatusCode } from '../utils/status';
// import { ApiError, handleError } from './error-handler';
// import jwt from 'jsonwebtoken';

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader?.split(' ')[1];

//     if (!token) {
//       throw new ApiError({
//         status: StatusCode.UNAUTHORIZED,
//         code: MessageCodes.UNAUTHORIZED,
//         message: 'Unauthorized',
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);

//     res.json(
//       createResponse({
//         status: StatusCode.SUCCESS,
//         message: 'Token is valid',
//         data: decoded,
//       })
//     );
//   } catch (err) {
//     handleError(res, err);
//   }
// };

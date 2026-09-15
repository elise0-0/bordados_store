import jwt from 'jsonwebtoken';

import ApiError from '../utils/ApiError.js';

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  const tokenMatch = authorization?.match(/^Bearer\s+(\S+)$/);

  if (!tokenMatch) {
    throw ApiError.unauthorized('Token no proporcionado');
  }

  const [, token] = tokenMatch;

  try {
    const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id, role };
    next();
  } catch {
    throw ApiError.unauthorized('Token inválido o expirado');
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    throw ApiError.forbidden();
  }

  next();
};

export default authMiddleware;

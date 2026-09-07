import ApiError from '../utils/ApiError.js';

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details ?? null,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    details: null,
  });
};

export default errorMiddleware;

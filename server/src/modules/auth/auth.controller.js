import * as authService from './auth.service.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const registerController = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);

  res.status(200).json({
    success: true,
    data: { user, token },
  });
});

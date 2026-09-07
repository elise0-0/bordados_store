import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../../config/db.js';
import ApiError from '../../utils/ApiError.js';

const SALT_ROUNDS = 10;
const INVALID_CREDENTIALS_MESSAGE = 'Credenciales inválidas';

const excludePasswordHash = ({ passwordHash, ...user }) => user;

export const register = async ({ email, password, name }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw ApiError.conflict('Ya existe una cuenta con este email');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
    },
  });

  return excludePasswordHash(user);
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw ApiError.unauthorized(INVALID_CREDENTIALS_MESSAGE);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw ApiError.unauthorized(INVALID_CREDENTIALS_MESSAGE);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );

  return {
    user: excludePasswordHash(user),
    token,
  };
};

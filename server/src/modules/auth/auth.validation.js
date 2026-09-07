import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('El email no tiene un formato válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
});

export const loginSchema = z.object({
  email: z.string().email('El email no tiene un formato válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

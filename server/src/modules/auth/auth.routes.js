import { Router } from 'express';

import { loginController, registerController } from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.validation.js';
import validate from '../../middlewares/validate.middleware.js';

const router = Router();

router.post('/register', validate(registerSchema), registerController);
router.post('/login', validate(loginSchema), loginController);

export default router;

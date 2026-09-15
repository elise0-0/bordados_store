import 'dotenv/config';

import app from './src/app.js';

const port = Number(process.env.PORT) || 3000;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no está configurado');
}

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});

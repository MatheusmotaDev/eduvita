import { Pool } from 'pg';

// Em ambientes serverless (Vercel), conexões de banco de dados podem se acumular.
// Aqui usamos um padrão global para garantir que o pool seja reutilizado no modo de desenvolvimento.
let pool: Pool;

if (!global.pgPool) {
  global.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Necessário para conectar ao Render (e muitos outros bancos em nuvem)
    },
  });
}

pool = global.pgPool;

export default pool;

// Definir a tipagem global no TypeScript
declare global {
  var pgPool: Pool | undefined;
}

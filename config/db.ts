import { drizzle } from 'drizzle-orm/neon-http'


const dataBase = drizzle(process.env.DATABASE_URL!);

export default dataBase;
import { Hono } from 'hono'
import { users } from './routes/users'
import { blog } from './routes/blog';
import { middleware } from './middleware/middleware';

const app = new Hono()

app.use("/api/v1/blog/*",middleware)

app.route("/api/v1/users",users);
app.route("/api/v1/blog",blog)

export default app

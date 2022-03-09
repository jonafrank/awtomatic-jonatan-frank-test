import Koa, { Context, Next } from 'koa';
import Router from '@koa/router';
import { getUsers } from './middleware/users';
import { auth } from './middleware/authorization';
import { notFound } from './middleware/notFound';

export const app = new Koa();
const router = new Router();
router.use(auth)
  .get('/users', getUsers);

app.use(router.routes())
  .use(router.allowedMethods());

export const server = app.listen(3000);

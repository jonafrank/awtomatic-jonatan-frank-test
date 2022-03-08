import Koa from 'koa';
import Router from '@koa/router';
import { getUsers } from './controller/users';

const app = new Koa();
const router = new Router();

router.get('/users', getUsers);

app.use(router.routes());
console.log(app);
app.listen(3000);

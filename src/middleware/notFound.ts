import { Context, Next } from "koa";

export const notFound = (ctx: Context, next: Next) => {
  ctx.status = 404;
  ctx.body = {
    message: 'Resource not found',
    error: 'Not Found',
  };
  next();
};

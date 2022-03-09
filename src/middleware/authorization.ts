import { Context, Next } from 'koa';
import { ForbiddenError } from '../errors/ForbiddenError';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const auth = (ctx: Context, next: Next) => {
  try {
    const authHeader = ctx.get('X-Awtomatic-Access-Token');
    if (!authHeader) {
      throw new UnauthorizedError('Missing header X-Awtomatic-Access-Token');
    }
    if (authHeader !== 'token') {
      throw new ForbiddenError('Invalid Token');
    }
    next();
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      ctx.status = 401;
      ctx.body = {
        error: 'Unauthorized',
        message: error.message,
      };
      ctx.app.emit('error', error, ctx);
    }
    if (error.name === 'ForbiddenError') {
      ctx.status = 403;
      ctx.body = {
        error: 'Forbidden',
        message: error.message,
      };
      ctx.app.emit('error', new Error('Forbidden'), ctx);
    }
  }
};

export class UnauthorizedError extends Error {
  status;

  name;

  constructor(message) {
    super(message);
    this.status = 401;
    this.name = 'UnauthorizedError';
  }
}

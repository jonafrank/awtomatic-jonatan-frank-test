export class NotFoundError extends Error {
  status;

  name;

  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'NotFoundError';
  }
}

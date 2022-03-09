export class ForbiddenError extends Error {
  status;

  name;

  constructor(message) {
    super(message);
    this.status = 403;
    this.name = 'ForbiddenError';
  }
}

export class InvalidArgumentKitchenAddCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments recipe add command`);
  }
}
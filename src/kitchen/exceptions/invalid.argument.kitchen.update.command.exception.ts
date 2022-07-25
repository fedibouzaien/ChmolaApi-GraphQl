export class InvalidArgumentKitchenUpdateCommandException extends Error {
  constructor(public readonly errors: any[]) {
    super(`invalid arguments kitchen update command`);
  }
}

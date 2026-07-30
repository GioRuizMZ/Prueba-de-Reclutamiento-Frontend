// Error con código HTTP para propagar el status apropiado al cliente.
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

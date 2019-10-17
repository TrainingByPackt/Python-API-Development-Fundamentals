export function APIHost(): string {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.HOST
    default:
      return 'http://localhost:5000/'
  }
}

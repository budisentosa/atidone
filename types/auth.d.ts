declare module '#auth-utils' {
  interface User {
    id: number
    username: string
    name: string
    email?: string
    login?: string // For GitHub compatibility
  }
}
export { }

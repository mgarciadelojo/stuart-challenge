import { Express } from 'express'

export const initServer = (app: Express, port: number): void => {
  app.listen(port)
  console.log(`Server running on http://localhost:${port}`)
}

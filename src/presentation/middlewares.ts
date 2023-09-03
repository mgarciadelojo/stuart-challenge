import { Request, Response, NextFunction } from 'express'
import { ValidationError, validationResult } from 'express-validator'

export const validateMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors: any = []
  errors.array().map((err: ValidationError) => extractedErrors.push(err.msg))

  return res.status(422).json({
    errors: extractedErrors
  })
}

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(400).json({
    errors: [err.message]
  })
}

export const middlewares = [validateMiddleware, errorHandlerMiddleware]

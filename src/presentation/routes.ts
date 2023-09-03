import { Request, Response } from 'express'
import { SyncCourierUsecase } from '../application/sync-courier.usecase'
import {
  CourierPostgresRepositoryFactory
} from '../infrastructure/persistence/repositories/courier-postgres.repository'
import { LookupCouriersUsecase } from '../application/lookup-couriers.usecase'
import { body, query } from 'express-validator'
import { validateMiddleware } from './middlewares'

export const initRoutes = (app) => {
  const courierRepository = CourierPostgresRepositoryFactory.create()
  const lookupCouriersUseCase = new LookupCouriersUsecase(courierRepository)
  const syncCourierUseCase = new SyncCourierUsecase(courierRepository)

  const courierValidationRules = () => {
    return [
      body('courier_id', 'courier_id is required').notEmpty(),
      body('courier_id', 'courier_id must be an integer').isInt({ min: 1 }).toInt(),
      body('max_capacity', 'max_capacity is required').notEmpty(),
      body('max_capacity', 'max_capacity must be an integer').isInt({ min: 1 }).toInt()
    ]
  }

  app.post('/couriers', courierValidationRules(), validateMiddleware, async (req: Request, res: Response) => {
    const { courier_id: courierId, max_capacity: maxCapacity } = req.body
    const updatedCourier = await syncCourierUseCase.execute(courierId, maxCapacity)

    res.status(200).json(updatedCourier)
  })

  const lookupValidationRules = () => {
    return [
      query('capacity_required', 'capacity_required is required').notEmpty(),
      query('capacity_required', 'capacity_required must be an integer').isInt({ min: 1 }).toInt()
    ]
  }

  app.get('/couriers/lookup', lookupValidationRules(), validateMiddleware, async (req: Request, res: Response) => {
    const couriers = await lookupCouriersUseCase.execute(req.query.capacity_required as unknown as number)

    if (couriers.length > 0) {
      res.status(200).json(couriers)
    } else {
      res.status(404).json({ error: 'No couriers found for the required capacity' })
    }
  })

  app.all('/*', () => {
    throw new Error('URL not found')
  })
}

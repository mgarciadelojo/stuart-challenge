import { EntitySchema } from 'typeorm'

export const CourierEntity = new EntitySchema({
  name: 'couriers',
  columns: {
    id: {
      type: Number,
      primary: true
    },
    maxCapacity: {
      type: Number
    }
  }
})

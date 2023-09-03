import { Courier } from '../models/courier'

export interface CourierRepository {
  findWithEqualsOrGreaterCapacity: (capacity: number) => Promise<Courier[]>
  save: (courier: Courier) => Promise<Courier>
}

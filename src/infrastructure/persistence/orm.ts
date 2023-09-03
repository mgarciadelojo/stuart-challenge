import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true,
})

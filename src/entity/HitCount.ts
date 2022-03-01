import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class HitCount {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @Column()
  origin!: string

  @Column()
  pathname!: string

  @Column()
  count!: number
}

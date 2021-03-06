import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class HitCount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  remoteAddress: string

  @Column()
  pathname: string

  @CreateDateColumn()
  accessedAt!: Date

  constructor(remoteAddress: string, pathname: string) {
    super()
    this.remoteAddress = remoteAddress
    this.pathname = pathname
  }
}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class AccessInfo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  remoteAddress: string

  @CreateDateColumn()
  accessedAt: Date

  constructor(remoteAddress: string, accessedAt: Date) {
    super()
    this.remoteAddress = remoteAddress
    this.accessedAt = accessedAt
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Photo from './photo.model';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({
    onUpdate: 'now()',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @Column({ name: 'deleted_at' })
  deletedAt!: Date;

  @OneToMany(() => Photo, (photo) => photo.user)
  @JoinColumn({ name: 'id' })
  photos?: Photo[];
}

export default User;

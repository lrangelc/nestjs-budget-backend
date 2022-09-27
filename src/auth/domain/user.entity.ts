import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserStatus } from './user.enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;
}

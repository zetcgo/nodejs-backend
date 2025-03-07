import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn() id?: number;
    @Column({ unique: true }) email: string;
    @Column() password: string;
    @Column() username: string;
    @CreateDateColumn() createdAt: Date = new Date();
}

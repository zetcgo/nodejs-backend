import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn() id?: number;
    @Column({ unique: true }) email: string;
    @Column() username: string;
    @Column() providerId: string;
    @CreateDateColumn() createdAt: Date = new Date();
}

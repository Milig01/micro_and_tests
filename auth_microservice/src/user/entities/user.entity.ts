import { Role } from "../../role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    hash: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];
}

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    surname: string;

    @Column({nullable: false})
    age: number;

    @Column({nullable: false, unique: true})
    phoneNumber: string;

    @Column({nullable: false, unique: true})
    email: string;
}

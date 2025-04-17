import { v4 as uuidv4 } from 'uuid';

type UserProps = {
    id?: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
};

export class User {
    public readonly id: string;
    public name: string;
    public email: string;
    public password: string;
    public refreshToken?: string | null;

    constructor(props: UserProps) {
        this.id = props.id || uuidv4();
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.refreshToken = props.refreshToken;
    }
}
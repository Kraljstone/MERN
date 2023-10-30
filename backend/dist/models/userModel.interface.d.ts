export interface userSchema {
    name: string;
    email: string;
    password: string;
    matchPassword: (password: string) => Promise<boolean>;
}

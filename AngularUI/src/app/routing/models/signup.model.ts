export interface SignUpModel {
    first_name: string;
    last_name: string;
    birth_date?: Date;
    email: string;
    password: string;
    is_staff?: boolean;
    is_superuser?: boolean
}
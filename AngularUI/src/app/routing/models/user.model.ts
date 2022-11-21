export interface UserModel {
    id: number;
    name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
    person_id: number;
}

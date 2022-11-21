export interface UserInfoModel {
    id: number;
    person_id: number;
    name: string;
    identification?: string;
    first_name?: string;
    last_name?: string;
    business_name?: string;
    birth_date?: Date;
    age?: number;
    email: string;
    is_active: boolean;
}
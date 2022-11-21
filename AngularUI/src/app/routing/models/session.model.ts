import { UserModel } from "./user.model";


export interface SessionModel extends UserModel {
    access_token: string;
    trusted_device: boolean;
    timestamp: number;
    is_logged: number;
    last_activity: number;
}
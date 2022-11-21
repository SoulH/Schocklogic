import { PersonModel } from "./person.model";

export interface ParticipantModel extends PersonModel {
    role?: string;
    event_id: number;
    created_at?: Date;
    revoked?: boolean;
}
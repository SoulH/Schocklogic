import { ParticipantModel } from "./participant.model";

export interface EventModel {
    id: number;
    name: string;
    description?: string;
    start: Date;
    end: Date;
    web_page?: string;
    address: string;
    location?: any;
    social_networks?: any;
    tags?: string[];
    created_at?: Date;
    files: string[];
    participants?: ParticipantModel[]
};
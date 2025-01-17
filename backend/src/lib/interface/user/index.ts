import { Document } from 'mongoose';

export interface Iuser extends Document{
    _id?: string;
    name?: string;
    photo?: string;
    email?: string;
    status?: "ACTIVE" | "DELETED" | "INACTIVE";
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    subscribers?: number,
    subscribedUsers?: string,
    fromGoogle?: boolean
}
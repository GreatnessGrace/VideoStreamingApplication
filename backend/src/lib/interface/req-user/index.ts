import { Types } from 'mongoose';

export interface IReqUser {
    user: {
        // resetPassword: {
        //     token: string,
        //     isUsed: boolean
        // },
    _id : Types.ObjectId,
    name: string,
    email: string,
    photo: string,
    password: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    _v: number,
    subscribers: number,
    subscribedUsers: string,
    fromGoogle: boolean
}
}
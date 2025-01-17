import { Types } from 'mongoose';

export interface IVideo extends Document {
    _id: Types.ObjectId;
    userId: string;
    title: string;
    desc: string;
    imgUrl: string;
    videoUrl: string;
    views?: number;
    tags?: string[];
    likes?: string[];
    dislikes?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

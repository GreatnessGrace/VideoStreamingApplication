import { Schema , Types, model } from 'mongoose';

const schema = new Schema({
    name:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    photo:{
        type: String
    },
    password:{
        type: String
    },
    status: {
        type: String,
        uppercase: true,
        enum: [ "ACTIVE", "DELETED", "INACTIVE" ],
        default: "ACTIVE",
      },
      subscribers: {
        type: Number,
        default: 0
      },
      subscribedUsers :{
        type: [String],
      },
      fromGoogle: {
        type: Boolean,
        default: false,
      }
},{
    timestamps: true
});

export const USER = model('user', schema) ;
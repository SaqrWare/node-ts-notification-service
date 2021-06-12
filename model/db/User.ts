import {Schema, model} from 'mongoose';
import User from "../domain/User";

const schema = new Schema<User>({
    name: String,
    email: String,
    phone: String,
    PNToken: String
});

const UserModel = model<User>('User', schema);

export = UserModel;
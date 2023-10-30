import mongoose from 'mongoose';
import { userSchema } from './userModel.interface';
declare const userSchema: mongoose.Schema<userSchema, mongoose.Model<userSchema, any, any, any, mongoose.Document<unknown, any, userSchema> & userSchema & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, userSchema, mongoose.Document<unknown, {}, mongoose.FlatRecord<userSchema>> & mongoose.FlatRecord<userSchema> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const User: mongoose.Model<userSchema, {}, {}, {}, mongoose.Document<unknown, {}, userSchema> & userSchema & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<userSchema, mongoose.Model<userSchema, any, any, any, mongoose.Document<unknown, any, userSchema> & userSchema & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, userSchema, mongoose.Document<unknown, {}, mongoose.FlatRecord<userSchema>> & mongoose.FlatRecord<userSchema> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default User;

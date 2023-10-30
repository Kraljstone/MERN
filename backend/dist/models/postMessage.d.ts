import mongoose from 'mongoose';
declare const PostMessage: mongoose.Model<{
    tags: string[];
    likeCount: number;
    createdAt: Date;
    message?: string | undefined;
    title?: string | undefined;
    creator?: string | undefined;
    selectedFile?: string | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    tags: string[];
    likeCount: number;
    createdAt: Date;
    message?: string | undefined;
    title?: string | undefined;
    creator?: string | undefined;
    selectedFile?: string | undefined;
}> & {
    tags: string[];
    likeCount: number;
    createdAt: Date;
    message?: string | undefined;
    title?: string | undefined;
    creator?: string | undefined;
    selectedFile?: string | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    tags: string[];
    likeCount: number;
    createdAt: Date;
    message?: string | undefined;
    title?: string | undefined;
    creator?: string | undefined;
    selectedFile?: string | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    tags: string[];
    likeCount: number;
    createdAt: Date;
    message?: string | undefined;
    title?: string | undefined;
    creator?: string | undefined;
    selectedFile?: string | undefined;
}>> & mongoose.FlatRecord<{
    tags: string[];
    likeCount: number;
    createdAt: Date;
    message?: string | undefined;
    title?: string | undefined;
    creator?: string | undefined;
    selectedFile?: string | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default PostMessage;

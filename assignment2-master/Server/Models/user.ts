import mongoose, { PassportLocalSchema}  from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose Schema
import PassportLocalMongoose from 'passport-local-mongoose';
const UserSchema = new Schema
({
    username: String,
    emailAddress: String,
    displayName: String,
    created: 
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "users"
});

UserSchema.plugin(PassportLocalMongoose);

declare global
{
    export type UserDocument = mongoose.Document &
    {
        _id: String,
        username: String,
        emailAddress: String,
        displayName: String
    }
}

const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

export default Model;
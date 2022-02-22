import mongoose from "mongoose";
const Schema = mongoose.Schema; // alias for mongoose Schema

const ContactSchema = new Schema
({
    name: String,
    number: String,
    address: String
},
{
    collection: "list"
});

const Model = mongoose.model("ContactList", ContactSchema);

export default Model;
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileimg: {type: String},
    newEmail: { type: String },
    emailOtp: { type: String },
},{timestamps: true});

export default mongoose.models.User || mongoose.model('User', UserSchema);
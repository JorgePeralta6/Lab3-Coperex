import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: false,
        enum: ['Admin'],
    },
    status: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, role, ...usuario } = this.toObject(); 
    usuario.uid = _id;

    if (role !== 'Admin') {
        delete usuario.role;
    }

    return usuario;
}

export default model('User', UserSchema);

import { Schema, model } from "mongoose";

const enterpriseSchema = Schema({
    nameE: {
        type: String,
        required: true,
    },
    nivelImpacto: {
        type: String,
        required: true,
    },
    añosT: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    contacts: [{
        type: String,
        required: true
    }],
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

export default model('Enterprise', enterpriseSchema);

import mongoose from "mongoose"
const db = mongoose.createConnection("mongodb+srv://rudrresh:epidemic@epidemic0.lxdsekq.mongodb.net/disease_count?retryWrites=true&w=majority")

const diseaseSchema = mongoose.Schema({
    
    state_id: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    cases: {
        type: Number,
        required: true
    },

    deaths: {
        type: Number,
        required: true
    }
});

const dengueModel = db.model('dengue_data', diseaseSchema)
const malariaModel = db.model('malaria_data', diseaseSchema)
const chikungunyaModel = db.model('chikungunya_data', diseaseSchema)

export {dengueModel, malariaModel, chikungunyaModel}
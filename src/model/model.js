import mongoose, { Types } from "mongoose";

const novedadSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: false
    },
    compras:{
        type: String,
        require: false
    },
    provedores:{
        type: String,
        require: false
    },
    empleado:{
        type: String,
        require: false
    },
    arriendo:{
        type: String,
        require: false
    },
    gastos:{
        type: String,
        require: false
    },
    trasnporte:{
        type: String,
        require: false
    },
    ganancia:{
        type: String,
        require: false
    },
    fecha:{
        type: Date,
        require: true
    }
})

const novedadModel = mongoose.model('Novedades', novedadSchema)

export default novedadModel;
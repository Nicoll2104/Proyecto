import mongoose from "mongoose";
import { isDecimal } from "validator";

const item_presupuesto = new mongoose.Schema(
    {
        codigo_presupuestal:{type:Number, required: true, unique:true,},
        nombre:{type:String, required:true,},
        presupuesto_inicial:{type: isDecimal, required:true,},
        vigencia:{type:Date, required:true,},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Item_presupuesto",item_presupuesto )

/*Tabla en proceso...*/

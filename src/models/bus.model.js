import mongoose from "mongoose";
import { Schema } from "mongoose";

const busSchema = new Schema({
     BusNumber: {
            type: String,
            required: true,
            unique: true
     },
        PickupPoint: {
            type: String,
            required: true
        },
        DropPoint: {
            type: String,
            required: true
        },
        DepartureTime: {
            type: String,
            required: true
        },
        ArrivalTime: {
            type: String,
            required: true
        },

           DriverEmail: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
}, { timestamps: true });


 const Bus = mongoose.model("Bus", busSchema);

 export { Bus };
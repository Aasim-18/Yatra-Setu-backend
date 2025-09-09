import { Bus } from  "../models/bus.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const registerBus = asyncHandler( async (req, res) => {
const {BusNumber, PickupPoint, DropPoint, DepartureTime, ArrivalTime, DriverEmail, password} = req.body;

 if( [BusNumber, PickupPoint, DropPoint, DepartureTime, ArrivalTime,  DriverEmail, password].some
((field) => field?.trim() === '')
) {
   throw new ApiError(400, "All fields are required")
 }

 const existedBus = await Bus.findOne({
    $or: [{BusNumber}, {DriverEmail}] 
 })
    if(existedBus) {
        throw new ApiError(400, "Bus already Registered")
    }

    const bus = await Bus.create({
        BusNumber,
        PickupPoint,
        DropPoint,
        DepartureTime,
        ArrivalTime,
        DriverEmail,
        password,
        role: "driver"

    })
    

    const busCreated  = await Bus.findById(bus._id).select( "-password ");

    if(!busCreated) {
        throw new ApiError(500, "Something went wrong while creating bus")
    }
    
    return res.status(201).json(
 new ApiResponse(200, busCreated, 
 "Bus Registerd Succesfully"
))
});

    

export { registerBus };
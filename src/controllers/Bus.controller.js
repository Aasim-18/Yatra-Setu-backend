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
        role: "driver",
        currentLocation: {
    latitude: req.body.latitude || 0,
    longitude: req.body.longitude || 0
  }

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

const searchBuses = asyncHandler( async (req, res) => {
    const { PickupPoint, DropPoint } = req.query;

    const buses = await Bus.find({pickupPoint: PickupPoint, dropPoint: DropPoint});
  return  res.status(200).json(
    new ApiResponse(200, buses, "Buses fetched successfully"
  ))
});

const getBusLocation = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const bus = await Bus.findById(id);
    if(!bus) {
        throw new ApiError(404, "Bus not found")
    };
    return res.status(200).json(
        new ApiResponse(200, { Location: bus.currentLocation}, "Bus location fetched successfully"
    ))
})

    

export { registerBus, searchBuses, getBusLocation };
import { Bus } from "../models/bus.model.js";

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("driverLocation", async ({ busId, lat, lng }) => {
      try {
        
        await Bus.findByIdAndUpdate(busId, {
          currentLocation: { lat, lng }
        });

        
        io.to(busId).emit("busLocationUpdate", { lat, lng });
      } catch (err) {
        console.error("Error updating location:", err.message);
      }
    });

    
    socket.on("joinBus", ({ busId }) => {
      socket.join(busId);
      console.log(`Passenger joined bus room: ${busId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

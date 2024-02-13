import {
  Get,
  Post,
  Delete,
  Route,
  Tags,
  Path,
  Body,
  SuccessResponse,
} from "tsoa";
import { IRide } from "../data-models/rides";
import { RideService, ICreateRideRequest } from "../services/rideService";

@Route("rides")
export class RidesController {
  /** Get a list of rides */
  @Get()
  @Tags("Rides")
  public async getRides(): Promise<IRide[]> {
    return await this.service.getAll();
  }

  // @SuccessResponse(200, "Ride request created")
  @Post()
  @Tags("Rides")
  public async createRide(
    @Body() requestBody: ICreateRideRequest
  ): Promise<IRide> {
    return await this.service.createRide(requestBody);
  }

  @SuccessResponse(200, "Ride request deleted")
  @Delete("{rideId}")
  @Tags("Rides")
  public async deleteRide(@Path() rideId: number): Promise<void> {
    return await this.service.deleteRide(rideId);
  }

  private get service() {
    return new RideService();
  }
}

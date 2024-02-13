import { IRide } from "../data-models/rides";
import { PostgresError } from "../repositories/base";
import { PostgresErrorCode } from "../repositories/pgErrorCodes";
import { RideRepository } from "../repositories/rideRepository";

export interface ICreateRideRequest {
  clientId: string;
  pickupLocation: string;
  dropoffLocation: string;
  proposedPrice: number;
  isOpen?: boolean;
}

export class RideService {
  public async getRideById(id: number): Promise<IRide> {
    const ride = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (!ride) {
      throw new Error("NOT_FOUND");
    }

    return ride;
  }

  public async getAll(): Promise<Array<IRide>> {
    return await this.repository.find({
      order: {
        id: "ASC",
      },
    });
  }

  public async createRide({
    clientId,
    pickupLocation,
    dropoffLocation,
    proposedPrice,
  }: ICreateRideRequest): Promise<IRide> {
    try {
      return await this.repository.create({
        clientId,
        pickupLocation,
        dropoffLocation,
        proposedPrice,
      });
    } catch (err) {
      this.checkForUniqueViolation(err);

      throw new Error("UNKNOWN_ERROR");
    }
  }

  public async deleteRide(rideId: number): Promise<void> {
    const ride = await this.getRideById(rideId);
    return await this.repository.delete({
      id: ride.id,
    });
  }

  public async closeRide(rideId: number) {
    const ride = await this.getRideById(rideId);
    return await this.repository.update(ride.id, {
      isOpen: false,
    });
  }

  private checkForUniqueViolation(err: unknown) {
    const emailInUse =
      err instanceof PostgresError &&
      err.code === PostgresErrorCode.UNIQUE_VIOLATION;
    if (emailInUse) {
      throw new Error("EMAIL_IN_USE");
    }
  }

  private get repository() {
    return new RideRepository();
  }
}

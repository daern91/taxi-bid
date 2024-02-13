import { IBid } from "../data-models/bids";
import { PostgresError } from "../repositories/base";
import { PostgresErrorCode } from "../repositories/pgErrorCodes";
import { BidRepository } from "../repositories/bidRepository";
import { RideService } from "./rideService";

export interface ICreateBidRequest {
  rideId: number;
  fleetId: string;
  bidAmount: number;
}

export class BidService {
  public async getBidById(id: number): Promise<IBid> {
    const bid = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (!bid) {
      throw new Error("NOT_FOUND");
    }

    return bid;
  }

  public async getAll(rideId: number): Promise<IBid[]> {
    return await this.repository.find({
      where: { rideId },
      order: {
        id: "ASC",
      },
    });
  }

  public async createBid({ rideId, fleetId, bidAmount }: ICreateBidRequest) {
    try {
      // @ts-ignore
      return await this.repository.create({
        rideId,
        fleetId,
        bidAmount,
      });
    } catch (err) {
      this.checkForUniqueViolation(err);

      throw new Error("UNKNOWN_ERROR");
    }
  }

  public async deleteBid(bidId: number): Promise<void> {
    const bid = await this.getBidById(bidId);
    return await this.repository.delete({
      //@ts-ignore
      id: bid.id,
    });
  }

  public async acceptBid({ rideId, bidId }: { rideId: number; bidId: number }) {
    const [bid, ride] = await Promise.all([
      this.getBidById(bidId),
      this.rideService.getRideById(rideId),
    ]);

    await Promise.all([
      this.rideService.closeRide(ride.id),
      this.repository.update(bid.id, {
        accepted: true,
      }),
    ]);
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
    return new BidRepository();
  }

  private get rideService() {
    return new RideService();
  }
}

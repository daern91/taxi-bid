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
import { IBid } from "../data-models/bids";
import { BidService, ICreateBidRequest } from "../services/bidService";

@Route("rides/{rideId}/bids/")
export class BidsController {
  /** Get a list of bids */
  @Get()
  @Tags("Bids")
  public async getBids(@Path() rideId: number): Promise<IBid[]> {
    return await this.service.getAll(rideId);
  }

  // @SuccessResponse(200, "Bid request created")
  @Post()
  @Tags("Bids")
  public async createBid(
    @Body() requestBody: ICreateBidRequest
  ): Promise<IBid> {
    return await this.service.createBid(requestBody);
  }

  @SuccessResponse(200, "Bid request deleted")
  @Delete("{bidId}")
  @Tags("Bids")
  public async deleteBid(@Path() bidId: number): Promise<void> {
    return await this.service.deleteBid(bidId);
  }

  @SuccessResponse(200, "Bid accepted")
  @Post("{bidId}/accept")
  @Tags("Bids")
  public async acceptBid(
    @Path() rideId: number,
    @Path() bidId: number
  ): Promise<void> {
    return await this.service.acceptBid({ rideId, bidId });
  }

  private get service() {
    return new BidService();
  }
}

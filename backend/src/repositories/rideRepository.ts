import { IRide, IRideCreateProps, Ride } from "../data-models/rides";
import { BaseRepository } from "./base";

export class RideRepository extends BaseRepository<
  IRide,
  Ride,
  IRideCreateProps
> {
  constructor() {
    super(Ride);
  }
}

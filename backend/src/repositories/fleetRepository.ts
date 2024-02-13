import { IFleet, IFleetCreateProps, Fleet } from "../data-models/fleets";
import { BaseRepository } from "./base";

export class FleetRepository extends BaseRepository<
  IFleet,
  Fleet,
  IFleetCreateProps
> {
  constructor() {
    super(Fleet);
  }
}

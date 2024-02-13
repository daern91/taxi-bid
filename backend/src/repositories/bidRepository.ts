import { IBid, IBidCreateProps, Bid } from "../data-models/bids";
import { BaseRepository } from "./base";

export class BidRepository extends BaseRepository<IBid, Bid, IBidCreateProps> {
  constructor() {
    super(Bid);
  }
}

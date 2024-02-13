import { expect } from "expect";

import { Client } from "../backend/src/build/client/Client";
import { ICreateRideRequest } from "../backend/src/build/client/models/ICreateRideRequest";
import { ICreateBidRequest } from "../backend/src/build/client/models/ICreateBidRequest";

// client is typed so we can see all the methods available
const client = new Client({ BASE: "http://localhost:9090" });

const clientId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";
const fleetId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12";

const rideDraft: ICreateRideRequest = {
  clientId,
  pickupLocation: "5 Main Street",
  dropoffLocation: "10 Elm Street",
  proposedPrice: 100,
};

async function main() {
  console.log("Running tests...");
  // 1. create a ride
  // 2. get all rides
  // 3. place a Bid
  // 4. get all bids
  // 5. approve a bid
  console.log("Creating a ride...");
  const ride = await client.rides.createRide(rideDraft);
  expect(ride).toMatchObject(rideDraft);
  console.log("Getting all rides...");
  const rides = await client.rides.getRides();
  const { isOpen } = rides.find((r) => r.id === ride.id)!;
  expect(isOpen).toBe(true);
  const rideId = ride.id;
  const bidDraft: ICreateBidRequest = { fleetId, rideId, bidAmount: 95 };
  console.log("Placing a bid...");
  const bid = await client.bids.createBid(bidDraft);
  expect(bid).toMatchObject(bidDraft);
  // expect bid.accepted to be false
  console.log("Getting all bids...");
  const bids = await client.bids.getBids(rideId);
  const { accepted } = bids.find((b) => b.id === bid.id)!;
  expect(accepted).toBe(false);
  console.log("Approving a bid...");
  await client.bids.acceptBid(ride.id, bid.id);
  const updatedRide = (await client.rides.getRides()).find(
    (r) => r.id === ride.id
  )!;
  expect(updatedRide.isOpen).toBe(false);
  const updatedBid = (await client.bids.getBids(rideId)).find(
    (b) => b.id === bid.id
  )!;
  expect(updatedBid.accepted).toBe(true);
  console.log("All tests passed");
}

main();

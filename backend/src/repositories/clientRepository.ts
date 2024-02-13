import { IClient, IClientCreateProps, Client } from "../data-models/clients";
import { BaseRepository } from "./base";

export class ClientRepository extends BaseRepository<
  IClient,
  Client,
  IClientCreateProps
> {
  constructor() {
    super(Client);
  }
}

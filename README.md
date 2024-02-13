#### Summary

Tiny TypeScript/nodejs backend taxi-booking app using Postgres as db and express as server framework.

The routes, spec, API-client, etc, are all generated with [tsoa](https://github.com/lukeautry/tsoa).

#### Description

One problem I've seen happening over and over again in the industry is that we get behind with chore work such as updating Openapi specs and SDKs. I wanted to find a solution, and this repo is an example that fixes it by using a code-first approach that generates routes, validators, client SDK, and API-spec (swagger).

The idea is that we should be able to code our types, and set up the routes/handlers we want, and everything else should be updated from there. I found that `tsoa` handles routes, validators, and specs nicely with express and [https://github.com/ferdikoomen/openapi-typescript-codegen](openapi-typescript-codegen) delivered a workable SDK.

Please have a look inside the backend folder to see the structure, then the magic happens with the `generate` script defined in the be:s `package.json`.

Please note that you need to cd into the backend folder and run both `npm install` and `npm run generate` there in order to build the be routes and the client.

After having generated the files

#### Setup steps

1. Add local db folder `mkdir -p .postgres/data`
2. `cd` into the backend folder and run `npm install` followed by `npm run generate`. This will build routes, api-spec, and api-client for the script to use.
3. Run `docker compose up` to start services and populate DB.
4. `cd` into the scripts folder, run `npm install` followed by `npm start` to verify that all endpoints are working.
5. Script tests should pass

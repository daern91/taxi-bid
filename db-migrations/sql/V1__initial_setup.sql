CREATE TABLE "Client" (
    "id" UUID PRIMARY KEY NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "phone" VARCHAR(20) UNIQUE NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Fleet" (
    "id" UUID PRIMARY KEY NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "phone" VARCHAR(20) UNIQUE NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Ride" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "clientId" UUID REFERENCES "Client"(id),
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "proposedPrice" DECIMAL NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "isOpen" BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "Bid" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "rideId" INT REFERENCES "Ride"(id),
    "fleetId" UUID REFERENCES "Fleet"(id),
    "bidAmount" DECIMAL NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- seed some test data

INSERT INTO "Client" ("id", "name", "email", "phone") VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
    'John Doe',
    'john@doe.com',
    '1234567890'
);

INSERT INTO "Fleet" ("id", "name", "email", "phone") VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 
    'Fleet 1',
    'fleet@taxi.com',
    '0987654321'
);


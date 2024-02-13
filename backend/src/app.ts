//@ts-nocheck
import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./build/routes";

import { ValidationService } from "@tsoa/runtime";
const app = express();

app.use(function (req, res, next) {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  next();
});

// ValidationService.prototype.ValidateParam = (
//   property,
//   rawValue,
//   name = "",
//   fieldErrors,
//   parent = "",
//   minimalSwaggerConfig
// ) => rawValue;
// RegisterRoutes.prototype.getValidatedArgs = (
//   args: any,
//   request: any,
//   response: any
// ) => Object.keys(args);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
RegisterRoutes(app);

export default app;

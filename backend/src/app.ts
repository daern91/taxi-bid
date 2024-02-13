import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./build/routes";

const app = express();

app.use(function (req, res, next) {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
RegisterRoutes(app);

export default app;

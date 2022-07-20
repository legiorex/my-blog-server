import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
  response.send("Hello world!");
});
app.listen(port, () => console.log(`⚡️ Running on port ${port}`));

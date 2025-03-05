import cors from "cors";
import express, { type Express, type NextFunction, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import createError, { type HttpError } from "http-errors";
import morgan from "morgan";
import path from "path";
import favicon from "serve-favicon";

import "./v1/config/env.config";


import { AuthRoutes,UserRoutes } from "./v1/routes";


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000,
  standardHeaders: true, 
  legacyHeaders: false, 
  message: {
    status: createError.TooManyRequests().status,
    message: createError.TooManyRequests().message,
  },
});

const corsOption = {
  origin: [String(process.env.FRONTEND_URL)],
};

const app: Express = express();


global.appRoot = path.resolve(__dirname);

// Middlewares
app.use(helmet());
app.set("trust proxy", 1);
app.use(limiter);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));


// Welcome Route
app.all("/", (_req: Request, res: Response, _next: NextFunction) => {
  res.send({ message: "API is Up and Running 😎🚀" });
});

const apiVersion: string = "v1";

// Routes
app.use(`/${apiVersion}/auth`, AuthRoutes);
app.use(`/${apiVersion}/user`, UserRoutes);

// 404 Handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});


const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`);
});

import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { AuthRouter } from "./routes/authRoutes";
import { BookRouter } from "./routes/bookRoutes";

dotenv.config();

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    methods: "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    optionsSuccessStatus: 200,
    origin: `${process.env.BASE_URL_FE}`,
    credentials: true,
  })
);

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Welcome to my API");
});

app.use("/api/public", express.static(path.join(__dirname, "../public")));

const authRouter = new AuthRouter();
const bookRouter = new BookRouter();

app.use("/api/auth", authRouter.getRouter());
app.use("/api/book", bookRouter.getRouter());

app.listen(PORT, () => {
  console.log(`server is running on => http://localhost:${PORT}/api`);
});

export default app;

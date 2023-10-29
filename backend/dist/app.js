import express from "express";
import "dotenv/config";
import morgan from 'morgan';
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
app.post('/hello', (req, res, next) => {
    res.send('Hello');
    console.log(req.body.name);
});
export default app;
//# sourceMappingURL=app.js.map
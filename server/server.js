import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import {handleClerkWebhook} from "./controllers/webhookController.js"

const app = express();

app.use(cors({origin: "", credentials: true}))
app.use(cookieParser())


app.post("/api/clerk", express.raw({ type: "application/json" }), handleClerkWebhook)
app.use(express.json())
app.use(clerkMiddleware())


app.get("/", (req, res) => res.send("API is Live..!"))

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await initDB();
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
});
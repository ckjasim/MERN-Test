import express from "express";
import { inventoryRouter } from "./inventory.routes";

const router = express.Router();

router.use("/inventory",inventoryRouter);

export {router as appRouter};
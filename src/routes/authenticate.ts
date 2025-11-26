import { Router } from "express";
import { Authenticate } from "../controllers/authenticate";

const router = Router();

router.post("/authenticate", Authenticate);

export default router;

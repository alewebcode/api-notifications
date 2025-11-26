import { Router } from "express";
import { CreateNotification } from "../controllers/create-notification";
import { ListNotification } from "../controllers/list-notification";
import { UpdateReadNotification } from "../controllers/update-read-notification";
import { DeleteNotification } from "../controllers/delete-notification";
import { UnreadCountNotification } from "../controllers/unread-count-notification";

const router = Router();

router.post("/notifications", CreateNotification);
router.get("/notifications", ListNotification);
router.patch("/notifications/:id/read", UpdateReadNotification);
router.delete("/notifications/:id", DeleteNotification);
router.get("/notifications/unread", UnreadCountNotification);

export default router;

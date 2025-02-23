import express from "express";
import { createUser, getUserData, verifyExistingUser} from "../controllers/users.controller";
import { signupValidator, userValidator } from "../utils/validators";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post("/verifyExistingUser",
    signupValidator,
    validateRequest,
    verifyExistingUser
);
router.post("/",
    userValidator,
    validateRequest,
    createUser
);

router.post("/getUserData",
    getUserData
);

export {router as authRouter};
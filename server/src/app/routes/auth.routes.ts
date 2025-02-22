import express from "express";
import { createUser, getUserData, verifyExistingUser} from "../controllers/users.controller";
import { signupValidator, userValidator } from "../utils/validators";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

// router.get("/search",
//     searchBooks
// )

// router.get("/:bookId",
//     getBookById,
// );

// router.patch("/:bookId",
//     updateBookValidator,
//     validateRequest,
//     updateBook
// );

// router.delete("/:bookId",
//     deleteBook
// )

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
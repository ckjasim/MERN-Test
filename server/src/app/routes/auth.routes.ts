import express from "express";
import { createUser} from "../controllers/users.controller";
import { signupValidator } from "../utils/validators";
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

router.post("/",
    signupValidator,
    validateRequest,
    createUser
);

// router.get("/",
//     getBooks
// );

export {router as authRouter};
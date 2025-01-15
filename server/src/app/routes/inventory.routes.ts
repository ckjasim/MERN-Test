import express from "express";
import { createUser} from "../controllers/users.controller";
// import { createBookValidator, updateBookValidator } from "../utils/validators";
// import validateRequest from "../middlewares/validate-request";

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
    // createBookValidator,
    // validateRequest,
    createUser
);

// router.get("/",
//     getBooks
// );

export {router as inventoryRouter};
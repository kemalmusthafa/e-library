import { Router } from "express";
import { body } from "express-validator";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import { auth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

export class BookRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  // Validation middleware
  private bookValidation = [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 1, max: 100 })
      .withMessage("Title must be between 1 and 100 characters"),

    body("author")
      .notEmpty()
      .withMessage("Author is required")
      .isString()
      .withMessage("Author must be a string")
      .isLength({ min: 1, max: 100 })
      .withMessage("Author must be between 1 and 100 characters"),

    body("year")
      .notEmpty()
      .withMessage("Year is required")
      .isInt({ min: 1000, max: new Date().getFullYear() + 5 })
      .withMessage(
        `Year must be a valid year between 1000 and ${
          new Date().getFullYear() + 5
        }`
      ),
  ];

  // Initialize routes
  private initializeRoutes(): void {
    // Optional JWT protection - uncomment to enable
    // this.router.use(auth);

    this.router.get("/", asyncHandler(getAllBooks));
    this.router.get("/:id", asyncHandler(getBookById));
    this.router.post("/", this.bookValidation, asyncHandler(createBook));
    this.router.put("/:id", this.bookValidation, asyncHandler(updateBook));
    this.router.delete("/:id", asyncHandler(deleteBook));
  }

  // Getter for the router
  getRouter(): Router {
    return this.router;
  }
}

import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getCurrentUser } from '../controllers/authController';
import { asyncHandler } from '../utils/asyncHandler';
import { auth } from '../middleware/auth';

export class AuthRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  // Validation middleware
  private registerValidation = [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email address'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('name')
      .optional()
      .isString().withMessage('Name must be a string')
  ];

  private loginValidation = [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email address'),

    body('password')
      .notEmpty().withMessage('Password is required')
  ];

  // Initialize routes
  private initializeRoutes(): void {
    this.router.post('/register', this.registerValidation, asyncHandler(register));
    this.router.post('/login', this.loginValidation, asyncHandler(login));
    this.router.get('/me', asyncHandler(getCurrentUser));
  }

  // Getter for the router
  getRouter(): Router {
    return this.router;
  }
}

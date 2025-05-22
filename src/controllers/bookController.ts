import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import { AppError } from '../utils/errorHandler';

const prisma = new PrismaClient();

// Get all books with optional filtering
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, year } = req.query;
    
    const filter: any = {};
    
    if (title) filter.title = { contains: String(title) };
    if (author) filter.author = { contains: String(author) };
    if (year) filter.year = parseInt(String(year));
    
    const books = await prisma.book.findMany({
      where: filter,
      orderBy: { createdAt: 'asc' } // Order in ascending order
    });
    
    return res.status(200).json({
      status: 'success',
      data: books
    });
  } catch (error) {
    next(error);
  }
};


// Get book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    
    if (isNaN(bookId)) {
      throw new AppError('Invalid book ID', 400);
    }
    
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });
    
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    
    return res.status(200).json({
      status: 'success',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }
    
    const { title, author, year } = req.body;
    
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        year: parseInt(year)
      }
    });
    
    return res.status(201).json({
      status: 'success',
      data: newBook
    });
  } catch (error) {
    next(error);
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }
    
    const { id } = req.params;
    const bookId = parseInt(id);
    
    if (isNaN(bookId)) {
      throw new AppError('Invalid book ID', 400);
    }
    
    const { title, author, year } = req.body;
    
    // Check if book exists
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId }
    });
    
    if (!existingBook) {
      throw new AppError('Book not found', 404);
    }
    
    // Update book
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        title: title !== undefined ? title : existingBook.title,
        author: author !== undefined ? author : existingBook.author,
        year: year !== undefined ? parseInt(year) : existingBook.year
      }
    });
    
    return res.status(200).json({
      status: 'success',
      data: updatedBook
    });
  } catch (error) {
    next(error);
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    
    if (isNaN(bookId)) {
      throw new AppError('Invalid book ID', 400);
    }
    
    // Check if book exists
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId }
    });
    
    if (!existingBook) {
      throw new AppError('Book not found', 404);
    }
    
    // Delete book
    await prisma.book.delete({
      where: { id: bookId }
    });
    
    return res.status(200).json({
      status: 'success',
      message: 'Book deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
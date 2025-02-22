// import { BookAttrs, BookDoc } from "../model/books.model";
import { UserDoc } from "../models/user.model";

export interface IUserService{
  findUserByEmailOrMobile(email: string, mobile: string): Promise<UserDoc | null>;
    // createBook(attrs: BookAttrs): Promise<BookDoc>;
    // findBooksByIsbn(isbn: string): Promise<BookDoc | null>;
    // updateBook(id: string, attrs: BookAttrs): Promise<BookDoc | null>;
    // deleteBook(id: string): Promise<void>;
    // getAllBooks(page: number, limit: number): Promise<{
    //     books: BookDoc[];
    //     totalBooks: number;
    //     totalPages: number;
    //   }>;
}
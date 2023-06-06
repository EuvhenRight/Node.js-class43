import {v4 as uuid} from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { json } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksDataFilePath = path.join(__dirname, 'booksData.json')

export const readBooks = (req, res) => {
  const data = fs.readFileSync(booksDataFilePath, 'utf8');
  res.send(data)
}

export const createBook = (req, res) => {
  const book = req.body;

  const newBook = {
    id: uuid(),
    title: book.title,
    author: book.author
  }

  let booksData = []

  if (!newBook || !newBook.title || !newBook.author) {
    return res.status(400).json({message: "Please provide all book details"})
  }

  if (fs.existsSync(booksDataFilePath)) {
  try {
    const data = fs.readFileSync(booksDataFilePath, 'utf8');
    booksData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading books data file:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
  // Added newBook
  booksData.push(newBook);

  try {
    const data = fs.writeFileSync(booksDataFilePath, JSON.stringify(booksData))
  } catch (error) {
    console.error('Error writing books data file:', error);
    return res.status(500).json({ message: "Internal server error" });
  }

  const response = {
    message: `New book added: ${newBook.title} by ${newBook.author}`,
    books: booksData
  };

  res.json(response); 
}

export const deleteBook = (req, res) => {
  const {id} = req.params
  const data = fs.readFileSync(booksDataFilePath, 'utf8')

  let booksData = []

  try {
    booksData = JSON.parse(data);
  } catch (error) {
    console.error('Error parsing books data', error)
    res.status(500).JSON({ message: "Internal server error" })
  }

  const bookIndex = booksData.findIndex(book => book.id === id)
  
  if (bookIndex !== -1) {
    const deletedBook = booksData.splice(bookIndex, 1)[0];

  try {
    fs.writeFileSync(booksDataFilePath, JSON.stringify(booksData))
  } catch (error) {
    console.error('Error writing books data file:', error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.json({
    message: `Book ${deletedBook.title} by ${deletedBook.author} deleted`,
    books: booksData
  })
  }else {
  res.status(404).json({message: "Book not found"})
  } 
}

export const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  try {
    const data = fs.readFileSync(booksDataFilePath, 'utf8');
    const booksData = JSON.parse(data);
    const findBook = booksData.find(book => book.id === id);

    if (!title || !author) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (findBook) {
      if (title && author) {
        findBook.title = title;
        findBook.author = author;
      }

      fs.writeFileSync(booksDataFilePath, JSON.stringify(booksData));

      res.json({
        message: `Book ${findBook.title} by ${findBook.author} updated`,
        books: booksData
      });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error('Error writing books data file:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};
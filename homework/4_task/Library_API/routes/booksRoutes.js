import {
  readBooks,
  createBook,
  updateBook,
  deleteBook
}
from '../controllers/books.js'

import express from 'express';

const app = express();

const router = express.Router();

router.get('/', readBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);


export default router;
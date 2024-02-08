import { Request, Response } from 'express';
import connection from '../model/database';

//Utils
const validateProductData = (req: Request, res: Response) => {
  const { name, price } = req.body;

  if (!(!name || !price)) return true;

  res.status(400).json({ message: 'Name and price are required.' });
  return false;
};

// Api
export const getAllProducts = (req: Request, res: Response) => {
  connection.query('SELECT * FROM Products', (error, results) => {
    if (error) {
      console.error('Error when searching for products:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    res.json(results);
  });
};

export const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  connection.query('SELECT * FROM Products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error to search ID:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json(results[0]);
  });
};

export const createProduct = (req: Request, res: Response) => {
  if (!validateProductData(req, res)) return;

  const { name, price } = req.body;

  connection.query('INSERT INTO Products (name, price) VALUES (?, ?)', [name, price], (error, result) => {
    if (error) {
      console.error('Error to create product:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    res.status(201).json({ id: result.insertId, name, price });
  });
};

export const updateProduct = (req: Request, res: Response) => {
  if (!validateProductData(req, res)) return;

  const productId = req.params.id;
  const { name, price } = req.body;
  
  connection.query('UPDATE Products SET name = ?, price = ? WHERE id = ?', [name, price, productId], (error, result) => {
    if (error) {
      console.error('Error to update product:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json({ id: productId, name, price });
  });
};

export const deleteProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  connection.query('DELETE FROM Products WHERE id = ?', [productId], (error, result) => {
    if (error) {
      console.error('Error to delete product:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json({ message: 'Product deleted with successfully.' });
  });
};
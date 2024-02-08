import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'MySqlPass1',
  database: 'mysql'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(error => {
  if (error) {
    console.error('Error to connect to database:', error);
    return;
  }
  console.log('Connection successfully with database MySQL');
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error to create table Products:', err);
    } else {
      console.log('Table Products created or existent.');
    }
  });
});

app.get('/products', (req: Request, res: Response) => {
  connection.query('SELECT * FROM Products', (error, results) => {
    if (error) {
      console.error('Error when searching for products:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    res.json(results);
  });
});

app.get('/products/:id', (req: Request, res: Response) => {
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
});

app.post('/products', (req: Request, res: Response) => {
  const { name, price } = req.body;
  connection.query('INSERT INTO Products (name, price) VALUES (?, ?)', [name, price], (error, result) => {
    if (error) {
      console.error('Error to create product:', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
    res.status(201).json({ id: result.insertId, name, price });
  });
});

app.put('/products/:id', (req: Request, res: Response) => {
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
});

app.delete('/products/:id', (req: Request, res: Response) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

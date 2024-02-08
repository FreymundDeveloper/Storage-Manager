import mysql from 'mysql';

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

export default connection;
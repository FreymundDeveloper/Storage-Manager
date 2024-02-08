import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as controller from '../controller/controller';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/products', controller.getAllProducts);
app.get('/products/:id', controller.getProductById);
app.post('/products', controller.createProduct);
app.put('/products/:id', controller.updateProduct);
app.delete('/products/:id', controller.deleteProduct);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
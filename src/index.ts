import express, { Request as ExpressReq, Response as ExpressRes } from 'express';
import bodyParser from 'body-parser';
import FileDB from './database/FileDB';


interface Cupcake {
  id: number;
  name: string;
  description?: string;
  price: number;
  ingredients?: string[];
}

const app = express();
const port = 3000;

app.use(bodyParser.json());



const isValidId = (id: number | string) => {
  return id && Number.isInteger(Number(id));
}

const isValidCupcake = (cupcake: Cupcake) => {
  return isValidId(cupcake.id) && cupcake.name && cupcake.price;
}

// POST /cupcake - Add a new cupcake
app.post('/v2/cupcake', (req: ExpressReq, res: ExpressRes) => {
  const db = new FileDB();
  const cupcake: Cupcake = req.body;

  if (!isValidCupcake(cupcake)) {
    return res.status(405).send('Invalid input');
  }

  db.create(cupcake.id.toString(), cupcake);
  res.status(201).send(cupcake);
});

// GET /cupcake - List all cupcakes
app.get('/v2/cupcake', (req: ExpressReq, res: ExpressRes) => {
  const db = new FileDB();
  const cupcakes = db.list();
  res.json(cupcakes);
});

// GET /cupcake/{cupcakeId} - Find cupcake by ID
app.get('/v2/cupcake/:cupcakeId', (req: ExpressReq, res: ExpressRes) => {
  const db = new FileDB();
  const cupcakeId = req.params.cupcakeId;
  if (!isValidId(cupcakeId)) {
    return res.status(400).send('Invalid ID supplied');
  }

  const cupcake = db.get(cupcakeId);

  if (!cupcake) {
    return res.status(404).send('Cupcake not found');
  }

  res.json(cupcake);
});

// PUT /cupcake/{cupcakeId} - Update an existing cupcake
app.put('/v2/cupcake/:cupcakeId', (req: ExpressReq, res: ExpressRes) => {
  const db = new FileDB();
  const cupcakeId = req.params.cupcakeId;
  const updatedCupcake = req.body;

  if (!isValidId(cupcakeId)) {
    return res.status(400).send('Invalid ID supplied');
  }

  if (!db.get(cupcakeId)) {
    return res.status(404).send('Cupcake not found');
  }

  if (!updatedCupcake.name || !updatedCupcake.price) {
    return res.status(405).send('Validation exception');
  }

  db.update(cupcakeId, updatedCupcake);

  res.status(200).send(updatedCupcake);
});


// DELETE /cupcake/{cupcakeId} - Deletes a cupcake
app.delete('/v2/cupcake/:cupcakeId', (req: ExpressReq, res: ExpressRes) => {
  const db = new FileDB();
  const cupcakeId = req.params.cupcakeId;

  if (!isValidId(cupcakeId)) {
    return res.status(400).send('Invalid ID supplied');
  }

  if (!db.get(cupcakeId)) {
    return res.status(404).send('Cupcake not found');
  }

  db.delete(cupcakeId);

  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

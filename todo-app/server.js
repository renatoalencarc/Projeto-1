
//Importing required modules
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

//Creating an express app
const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tododb',
  password: 'admin',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id');
  res.json(result.rows);
});

app.post('/todos', async (req, res) => {
  const { task } = req.body;
  const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *', [task]);
  res.json(result.rows[0]);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const result = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
  res.json(result.rows[0]);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  res.json({ message: 'Todo deleted' });
});

//Starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

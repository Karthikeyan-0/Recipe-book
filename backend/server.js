const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 5000;

// Replace with your Atlas connection string
const uri = 'mongodb+srv://devaprasanna:2278940@cluster0.4ncqsow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors());
app.use(express.json());

let recipesCollection;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('recipeBook');
    recipesCollection = db.collection('recipes');
    app.listen(port, () => {
      console.log(`Backend server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB Atlas:', err));

// Get all recipes
app.get('/recipes', async (req, res) => {
  const recipes = await recipesCollection.find().toArray();
  res.json(recipes);
});

// Get a single recipe by ID
app.get('/recipes/:id', async (req, res) => {
  const recipe = await recipesCollection.findOne({ _id: new ObjectId(req.params.id) });
  if (!recipe) return res.status(404).send('Recipe not found');
  res.json(recipe);
});

// Add a new recipe
app.post('/recipes', async (req, res) => {
  const { name, ingredients, instructions, image } = req.body;
  if (!name || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Name, ingredients, and instructions are required.' });
  }
  const newRecipe = { name, ingredients, instructions, image: image || 'https://via.placeholder.com/150' };
  const result = await recipesCollection.insertOne(newRecipe);
  res.status(201).json({ ...newRecipe, _id: result.insertedId });
});

// Delete a recipe
app.delete('/recipes/:id', async (req, res) => {
  const result = await recipesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).send('Recipe not found');
  // ...existing code...
});
  // ...existing code...

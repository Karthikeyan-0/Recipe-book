const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 5000;

// Replace with your Atlas connection string
const uri = 'mongodb+srv://james24:jamesa4271@cluster.qfifrcl.mongodb.net/recipeBook';

app.use(cors());
app.use(express.json());

let recipesCollection;
let mongoConnected = false;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('recipeBook');
    recipesCollection = db.collection('recipes');
    mongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully');
    app.listen(port, () => {
      console.log(`✅ Backend server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB Atlas:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongoConnected,
    port
  });
});

// Get all recipes
app.get('/recipes', async (req, res) => {
  try {
    if (!recipesCollection) {
      console.error('❌ recipesCollection is not initialized');
      return res.status(500).json({ error: 'Database not connected' });
    }
    const recipes = await recipesCollection.find().toArray();
    console.log(`✅ Found ${recipes.length} recipes in MongoDB`);
    
    // Transform recipes to handle both old and new field names
    const transformedRecipes = recipes.map((recipe, idx) => {
      // Check all possible field name variations for name
      const recipeName = 
        recipe.name || 
        recipe['Recipe Name'] || 
        recipe.recipeName || 
        recipe['recipe_name'] ||
        recipe['RecipeName'] ||
        recipe.title ||
        recipe['Title'] ||
        'Unknown Recipe';
      
      // Check all possible field name variations for ingredients
      const recipeIngredients = 
        recipe.ingredients || 
        recipe['Ingredients'] || 
        recipe.Ingredients || 
        recipe['ingredient'] ||
        recipe['ingredient_list'] ||
        recipe['Ingredient List'] ||
        recipe.items ||
        'No ingredients';
      
      // Check all possible field name variations for instructions
      const recipeInstructions = 
        recipe.instructions || 
        recipe['Preparation / Instructions'] || 
        recipe['preparation / instructions'] || 
        recipe['Preparation/Instructions'] ||
        recipe['preparation'] ||
        recipe['Preparation'] ||
        recipe['steps'] ||
        recipe['Steps'] ||
        recipe['method'] ||
        recipe['Method'] ||
        'No instructions';
      
      const transformed = {
        _id: recipe._id,
        name: String(recipeName).trim(),
        ingredients: String(recipeIngredients).trim(),
        instructions: String(recipeInstructions).trim(),
        image: recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop'
      };
      
      // Log first 5 recipes to debug
      if (idx < 5) {
        console.log(`Recipe ${idx}:`, { 
          original_keys: Object.keys(recipe),
          transformed_name: transformed.name,
          transformed_ingredients_length: transformed.ingredients.length,
          transformed_instructions_length: transformed.instructions.length
        });
      }
      
      return transformed;
    });
    
    console.log(`📤 Sending ${transformedRecipes.length} transformed recipes`);
    res.json(transformedRecipes);
  } catch (err) {
    console.error('❌ Error fetching recipes:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get a single recipe by ID
app.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await recipesCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!recipe) return res.status(404).send('Recipe not found');
    // Transform recipe to handle both old and new field names
    const transformedRecipe = {
      _id: recipe._id,
      name: recipe.name || recipe['Recipe Name'],
      ingredients: recipe.ingredients || recipe['Ingredients'],
      instructions: recipe.instructions || recipe['Preparation / Instructions'],
      image: recipe.image
    };
    res.json(transformedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new recipe
app.post('/recipes', async (req, res) => {
  try {
    if (!recipesCollection) {
      console.error('❌ recipesCollection is not initialized');
      return res.status(500).json({ message: 'Database not connected' });
    }
    const { name, ingredients, instructions, image } = req.body;
    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Name, ingredients, and instructions are required.' });
    }
    const newRecipe = { name, ingredients, instructions, image: image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop' };
    const result = await recipesCollection.insertOne(newRecipe);
    console.log(`✅ Recipe added successfully with ID: ${result.insertedId}`);
    res.status(201).json({ ...newRecipe, _id: result.insertedId });
  } catch (err) {
    console.error('❌ Error adding recipe:', err);
    res.status(500).json({ message: err.message });
  }
});


// Delete a recipe
app.delete('/recipes/:id', async (req, res) => {
  const result = await recipesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).send('Recipe not found');
  res.json({ message: 'Recipe deleted successfully' });
});

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get All Categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ 
      include: [{ model: Product }] 
    });

    res.status(200).json(categories);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Get 1 specific category
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { 
      include: [{ model: Product }] 
    });

    if ((!category)) {
      res.status(404).json({ message: "No category found with that ID."});
      return;
    }

    res.status(200).json(category);

  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

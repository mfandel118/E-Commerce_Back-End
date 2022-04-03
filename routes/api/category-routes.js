const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET All Categories
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

// GET a Specific category by id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { 
      include: [{ model: Product }] 
    });

    if ((!category)) {
      res.status(404).json({ 
        message: "No category found with that ID."
      });
      return;
    } else {
      res.status(200).json(category);
    };

  } catch (err) {
    res.status(500).json(err);
  }
});

// POST / CREATE a New category
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);

  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT / UPDATE a Specific category by id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!category[0]) {
      res.status(404).json({ message: "No category found with that ID." });
      return;
    } else {
      res.status(200).json(category);
    };

  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a Specific category by id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({
        message: "No category found with that ID."
      })
      return;
    } else {
      res.status(200).json(category);
    };
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET All tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ 
      include: [{ model: Product }] 
    });

    res.status(200).json(tags);

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a Specific tag by id
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, { 
      include: [{ model: Product }] 
    });

    if ((!tag)) {
      res.status(404).json({ 
        message: "No tag found with that ID."
      });
      return;
    } else {
      res.status(200).json(tag);
    };

  } catch (err) {
    res.status(500).json(err);
  }
});

// POST / CREATE a New tag
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);

  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT / UPDATE a Specific tag by id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tag[0]) {
      res.status(404).json({ message: "No tag found with that ID." });
      return;
    } else {
      res.status(200).json(tag);
    };

  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a Specific tag by id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tag) {
      res.status(404).json({
        message: "No tag found with that ID."
      })
      return;
    } else {
      res.status(200).json(tag);
    };

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
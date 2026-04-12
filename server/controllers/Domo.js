const models = require('../models');

const { Domo } = models;
// changed during domo d
const makerPage = (req, res) => res.render('app');

const makeDomo = async (req, res) => {
  const domoName = `${req.body.name}`;
  const domoAge = `${req.body.age}`;

  if (!domoName || !domoAge) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const domoData = {
    name: domoName,
    age: domoAge,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    // Return success without redirect to avoid full page reload
    return res.status(201).json({ name: newDomo.name, age: newDomo.age });
  } catch  {
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

const getDomos = async (req, res) => {
  try {
    const docs = await Domo.find({ owner: req.session.account._id })
      .select('name age')
      .lean()
      .exec();

    // Return domos as JSON for React to render
    return res.json({ domos: docs });
  } catch {
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};


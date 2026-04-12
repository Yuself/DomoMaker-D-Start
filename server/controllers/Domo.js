const models = require('../models');

const { Domo } = models;
// changed during domo b
const makerPage = async (req, res) => {
  try {
    const docs = await Domo.find({ owner: req.session.account._id }).select('name age').lean().exec();
    return res.render('app', { domos: docs });
  } catch  {
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

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
    return res.json({ redirect: '/maker' });
  } catch  {
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
};
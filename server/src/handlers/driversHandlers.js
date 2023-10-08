const { createDriver, getAllDrivers, getDriverById, searchDriverByName } = require('../controllers/driverControllers');
const { createOrRetrieveTeam } = require('../controllers/teamControllers');

const getDriversHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const results = name ? await searchDriverByName(name) : await getAllDrivers();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
}

const getDriverByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? 'DB' : 'API';

  try {
    const driver = await getDriverById(id, source);
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const createDriverHandler = async (req, res) => {
  try {
    const { forename, surname, description, image, nationality, dob, team } = req.body;
    const newDriver = await createDriver(forename, surname, description, image, nationality, dob); //Crea un driver en la db
    const teamRecords = await Promise.all(team.map(teamName => createOrRetrieveTeam(teamName))); //se obtenen los teams, si no existe en la db lo crea

    await newDriver.addTeams(teamRecords); //crea la relacion del driver con los teams

    res.status(200).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
}

module.exports = {
  getDriversHandler,
  getDriverByIdHandler,
  createDriverHandler
}
const { saveTeamsApi, getDbTeams } = require('../controllers/teamControllers');

const getTeamsHandler = async (req, res) => {
  await saveTeamsApi();
  setTimeout( async () => {
    const results = await getDbTeams();
    res.status(200).json(results);
  }, 1);

  // const results = await getDbTeams();
  // res.status(200).json(results);

}

module.exports = { getTeamsHandler }
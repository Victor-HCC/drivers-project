const { Driver, Team } = require('../db.js');
const axios = require('axios');

const dbDataClean = (arr) => {
  const result = arr.map(driver => {
    const teamNames = driver.Teams.map(type => type.name);
    const { Teams, ...driverWithoutTeam } = driver.toJSON();  //Para separar la propiedad Types ya que tiene otro formato
    return {
      ...driverWithoutTeam,
      teams: teamNames.join(', '),
    };
  });

  return result;
}

const apiDataClean = (arr) => {
  return arr.map(driver => {
    return {
      id: driver.id,
      forename: driver.name.forename,
      surname: driver.name.surname,
      nationality: driver.nationality,
      description: driver.description,
      image: driver.image.url ? driver.image.url : 'https://i.postimg.cc/C1jDwVFD/pilot-f1.jpg',
      teams: driver.teams,
      dob: driver.dob,
      created: false,
    }
  })
}

const getAllDrivers = async () => {
  //Busco en la db
  const dbDrivers = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  //Busco en la API
  const apiDrivers = (await axios.get('http://localhost:5000/drivers')).data;

  const results = [...dbDataClean(dbDrivers), ...apiDataClean(apiDrivers)];

  return results;
}

const createDriver = async (forename, surname, description, image, nationality, dob) => {
  if(!image) {
    image = 'https://i.postimg.cc/C1jDwVFD/pilot-f1.jpg';
  }
  const newDriver = await Driver.create({forename, surname, description, image, nationality, dob});
  return newDriver;
}

const getDriverById = async (id, source) => {
  const driver = 
    source === 'API'
      ? apiDataClean([(await axios.get(`http://localhost:5000/drivers/${id}`)).data])
      : dbDataClean([await Driver.findByPk(id, {
        include: [
          {
            model: Team,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      })]);
  
  return driver;
}

const searchDriverByName = async (name) => {
  // En la db
  const dbDrivers = dbDataClean(await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
      through: { attributes: [] },
    },
    where: {
      forename: name
    },
    limit: 15,
  }));

  // En la API
  const apidrivers = apiDataClean((await axios.get(`http://localhost:5000/drivers?name.forename=${name}`)).data).slice(0, 15);

  return [...dbDrivers, ...apidrivers].slice(0, 15);
}

module.exports = { createDriver, getAllDrivers, getDriverById, searchDriverByName }
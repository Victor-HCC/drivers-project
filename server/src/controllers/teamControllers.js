const { Team } = require('../db.js');
const axios = require('axios');

const createOrRetrieveTeam = async (teamName) => {
  // Try to find an existing type record with the given name
  const existingTeam = await Team.findOne({ where: { name: teamName } });

  // If it exists, return it; otherwise, create a new one
  if (existingTeam) {
    return existingTeam;
  } else {
    return Team.create({ name: teamName });
  }
}

const cleanArray = (arr) => {
  let teams = [];
  let aux = [];

  arr.forEach(elem => {
    // console.log(`${elem.teams} con id ${elem.id}`);
    if(elem.teams) {
      elem.teams.split(',').forEach(elem2 => {
        if(!aux.includes(elem2.trim())) {
        teams.push({name: elem2.trim()});
        aux.push(elem2.trim());
        }
      })
    }
  })

  return teams;
}

const dbDataClean = (arr) => {
  const result = arr.map(team => {
    return team.name;
  });

  return result;
}

const saveTeamsApi = async () => {
  const empty = await Team.count();
  if(empty === 0) { // La tabla esta vacia, se pueden guardar los datos
    
    //buscar en la api
    const apiTeamsRaw = (await axios.get('http://localhost:5000/drivers')).data;
    const apiTeams = cleanArray(apiTeamsRaw);
    // console.log(apiTeams);
    apiTeams.forEach(async (obj) => {
      await Team.create(obj);
    });
  } else {
    // The table is not empty
    console.log('Table is not empty');
  }
  
  // return apiTypes;
}

const getDbTeams = async () => {
  const dbTeams = await Team.findAll();
  const dbTeamsClean = dbDataClean(dbTeams);
  return dbTeamsClean;
}

module.exports = { createOrRetrieveTeam, saveTeamsApi, getDbTeams }
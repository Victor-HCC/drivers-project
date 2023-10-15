import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_TEAMS = 'GET_TEAMS';

export const getDrivers = () => {
  return async function(dispatch) {
    const drivers = (await axios.get('http://localhost:3001/drivers')).data
    dispatch({ type: GET_USERS, payload: drivers });
  }
}

export const getDriver = (id) => {
  return async function(dispatch) {
    const driver = (await axios.get(`http://localhost:3001/drivers/${id}`)).data
    dispatch({ type: GET_USER, payload: driver });
  }
}

export const getTeams = () => {
  return async function(dispatch) {
    const teams = (await axios.get('http://localhost:3001/teams')).data
    dispatch({ type: GET_TEAMS, payload: teams });
  }
}
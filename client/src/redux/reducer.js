import { GET_USER, GET_USERS, GET_TEAMS } from "./actions";

const initialState = {
  drivers: [],
  driver: [],
  teams: []
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER:
      return { ...state, driver: action.payload };
    case GET_USERS:
      return { ...state, drivers: action.payload };
    case GET_TEAMS:
      return { ...state, teams: action.payload };
    default:
      return { ...state };
  }
}

export default rootReducer;

import { SHOW_PROGRESS, RECEIVE_DATA } from "../action/constain";

const initialState = { people: {} };

export default function peopleReducer(state = initialState, action) {
  console.log("reducer =>>", action);
  switch (action.type) {
    case SHOW_PROGRESS:
      return {
        people: action.data,
      };
    case RECEIVE_DATA:
      return {
        people: state.people ,
        // people: state.people.filter((p) => p.name !== action.person.name),
      };
    default:
      console.log("PEOPLEEE", state.people);
      return state;
  }
}
export const Types = {
  LOGIN : "LOGIN",
  ADD_USER:'ADD_USER',
  UPDATE_USER:'UPDATE_USER'
}
import { LOGGED_ID } from "../actions/type";

const initialState = {
  loggedInUser: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

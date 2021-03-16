import { createStore } from "redux";

const store = createStore((state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
}, []);

export default store;

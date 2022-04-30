import axios from "axios";

import {
  SMALL_IMAGE_CHANGED,
  SMALL_IMAGE2_CHANGED,
  SMALL_IMAGE3_CHANGED,
} from "./lineup";
import { NAMES_CHANGED } from "./names";
const initialState = {
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
    lineupImage1: "",
    lineupImage2: "",
  },
  configuration: {
    headerColor: "#850037",
    numberColor: "#850037",
    cellboxColor: "#850037",
    cellboxTextColor: "#7F1D1E",
    enableLogo: false,
    imageName: "",
    textAlignment: "center",
    centerLogoSize: 200,
    fontSize: "64px",
    enableEmptySheet: false,
    leftLogoSize: 50,
    leftLogoPosition: "center",
    rightLogoSize: 50,
    rightLogoPosition: "center",
  },
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_CHANGED:
      return { ...state, user: action.payload };
    case CONFIGURATION_CHANGED:
      return { ...state, configuration: action.payload };
    default:
      return state;
  }
}

//selectors
export const getUser = (state) => state.user.user;
export const getConfiguration = (state) => state.user.configuration;

//wow

export const USER_CHANGED = "user/userLogin";
export const CONFIGURATION_CHANGED = "user/configuration";

//actions creator

export const userLogin = (credentails) => {
  return async function (dispatch) {
    console.log("found another function");
    try {
      console.log("credentails", credentails);
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "auth/login",
        credentails
      );
      console.log(response.data.user, "<=========");
      console.log(response.status, "<========= status");
      if (response.status === 200) {
        dispatch({ type: USER_CHANGED, payload: response.data.user });
        dispatch({
          type: SMALL_IMAGE_CHANGED,
          payload: response.data.user.lineupImage1,
        });
        dispatch({
          type: SMALL_IMAGE2_CHANGED,
          payload: response.data.user.lineupImage2,
        });
        dispatch({
          type: SMALL_IMAGE3_CHANGED,
          payload: response.data.user.lineupImage3,
        });
        dispatch({ type: NAMES_CHANGED, payload: response.data.user.roster });
      }
      return { status: response.status, message: response.data.message };
    } catch (e) {
      return { status: e.response.status, message: e.response.data.message };
    }
  };
};

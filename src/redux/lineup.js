import axios from "axios";

const initialState = {
  team1Names: [
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
  ],
  team2Names: [
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
    {
      playerOne: "",
      playerOnePosition: "",
      playerTwo: "",
      playerTwoPosition: "",
    },
  ],
  team1LHH: ["", "", "", "", "", "", ""],
  team2LHH: ["", "", "", "", "", "", ""],
  team1RHH: ["", "", "", "", "", "", ""],
  team2RHH: ["", "", "", "", "", "", ""],
  team1LHP: ["", "", "", "", "", "", ""],
  team2LHP: ["", "", "", "", "", "", ""],
  team1RHP: ["", "", "", "", "", "", ""],
  team2RHP: ["", "", "", "", "", "", ""],
  team1Name: "",
  team2Name: "",
  date: new Date(),
  positions: [
    "C",
    "1B",
    "2B",
    "3B",
    "SS",
    "LF",
    "CF",
    "RF",
    "DH",
    "P",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ],
  assignedPositionForTeam1: ["", "", "", "", "", "", "", "", "", "", ""],
  assignedPositionForTeam2: ["", "", "", "", "", "", "", "", "", "", ""],
  smallImage1: "",
  smallImage2: "",
  smallImage3: "smallImage3",
  coachName: "",
  establishmentName: "Enter Name",
  lastPosition: "P",
};

export function lineupReducer(state = initialState, action) {
  switch (action.type) {
    case LINEUP_CHANGED:
      return { ...state, names: action.payload };
    case TEAM1NAME_CHANGED:
      return { ...state, team1Name: action.payload };
    case TEAM2NAME_CHANGED:
      return { ...state, team2Name: action.payload };
    case DATE_CHANGED:
      return { ...state, date: action.payload };
    case TEAM1_NAMES_CHANGED:
      return { ...state, team1Names: action.payload };
    case TEAM2_NAMES_CHANGED:
      return { ...state, team2Names: action.payload };
    case ASSIGNED_POSITION_CHANGED_FOR_TEAM1_CHANGED:
      return { ...state, assignedPositionForTeam1: action.payload };
    case ASSIGNED_POSITION_CHANGED_FOR_TEAM2_CHANGED:
      return { ...state, assignedPositionForTeam1: action.payload };
    case SMALL_IMAGE_CHANGED:
      return { ...state, smallImage1: action.payload };
    case SMALL_IMAGE2_CHANGED:
      return { ...state, smallImage2: action.payload };
    case SMALL_IMAGE3_CHANGED:
      return { ...state, smallImage3: action.payload };
    case TEAM1_LHH_CHANGED:
      return { ...state, team1LHH: action.payload };
    case TEAM2_LHH_CHANGED:
      return { ...state, team2LHH: action.payload };
    case TEAM1_RHH_CHANGED:
      return { ...state, team1RHH: action.payload };
    case TEAM2_RHH_CHANGED:
      return { ...state, team2RHH: action.payload };
    case TEAM1_LHP_CHANGED:
      return { ...state, team1LHP: action.payload };
    case TEAM2_LHP_CHANGED:
      return { ...state, team2LHP: action.payload };
    case TEAM1_RHP_CHANGED:
      return { ...state, team1RHP: action.payload };
    case TEAM2_RHP_CHANGED:
      return { ...state, team2RHP: action.payload };
    case COACH_NAME_CHANGED:
      return { ...state, coachName: action.payload };
    case ESTABLISHMENT_NAME_CHANGED:
      return { ...state, establishmentName: action.payload };
    case LAST_POSITIION_CHANGED:
      return { ...state, lastPosition: action.payload };
    default:
      return state;
  }
}

//selectors
export const getCompleteLineup = (state) => state.lineup;
export const getLineupDate = (state) => state.lineup.date;
export const getLineup = (state) => state.lineup.names;
export const getTeam1Name = (state) => state.lineup.team1Name;
export const getTeam2Name = (state) => state.lineup.team2Name;
export const getTeam1 = (state) => state.lineup.team1Names;
export const getTeam2 = (state) => state.lineup.team2Names;
export const getDate = (state) => state.lineup.date;
export const getPositions = (state) => state.lineup.positions;
export const getsmallImage1 = (state) => state.lineup.smallImage1;
export const getsmallImage2 = (state) => state.lineup.smallImage2;
export const getsmallImage3 = (state) => state.lineup.smallImage3;
export const getAssignedPositionForTeam1 = (state) =>
  state.lineup.assignedPositionForTeam1;
export const getAssignedPositionForTeam2 = (state) =>
  state.lineup.assignedPositionForTeam2;
export const getTeam1LHH = (state) => state.lineup.team1LHH;
export const getTeam2LHH = (state) => state.lineup.team2LHH;
export const getTeam1RHH = (state) => state.lineup.team1RHH;
export const getTeam2RHH = (state) => state.lineup.team2RHH;
export const getTeam1LHP = (state) => state.lineup.team1LHP;
export const getTeam2LHP = (state) => state.lineup.team2LHP;
export const getTeam1RHP = (state) => state.lineup.team1RHP;
export const getTeam2RHP = (state) => state.lineup.team2RHP;
export const getCoachName = (state) => state.lineup.coachName;
export const getEstablishmentName = (state) => state.lineup.establishmentName;
export const getLastPosition = (state) => state.lineup.lastPosition;

//action types
export const LINEUP_CHANGED = "lineup/nameChanged";
export const TEAM1NAME_CHANGED = "lineup/team1Changed";
export const TEAM2NAME_CHANGED = "lineup/team2Changed";
export const DATE_CHANGED = "lineup/dateChanged";
export const TEAM1_NAMES_CHANGED = "lineup/team1NamesChanged";
export const TEAM2_NAMES_CHANGED = "lineup/team2NamesChanged";
export const ASSIGNED_POSITION_CHANGED_FOR_TEAM1_CHANGED =
  "lineup/assignedPositionChangedForTeam1";
export const ASSIGNED_POSITION_CHANGED_FOR_TEAM2_CHANGED =
  "lineup/assignedPositionChangedForTeam2";
export const TEAM1_LHH_CHANGED = "lineup/team1LHHChanged";
export const TEAM2_LHH_CHANGED = "lineup/team2LHHChanged";
export const TEAM1_RHH_CHANGED = "lineup/team1RHHChanged";
export const TEAM2_RHH_CHANGED = "lineup/team2RHHChanged";
export const TEAM1_LHP_CHANGED = "lineup/team1LHPChanged";
export const TEAM2_LHP_CHANGED = "lineup/team2LHPChanged";
export const TEAM1_RHP_CHANGED = "lineup/team1RHPChanged";
export const TEAM2_RHP_CHANGED = "lineup/team2RHPChanged";
export const SMALL_IMAGE_CHANGED = "lineup/smallImage1";
export const SMALL_IMAGE2_CHANGED = "lineup/smallImage2";
export const SMALL_IMAGE3_CHANGED = "lineup/smallImage3";
export const COACH_NAME_CHANGED = "lineup/coachName";
export const ESTABLISHMENT_NAME_CHANGED = "lineup/establishmentName";
export const LAST_POSITIION_CHANGED = "lineup/lastPosition";

//action creator
console.log(process.env.REACT_APP_BASE_URL, "<========================");
export function changeImage(obj) {
  return async function changeImageThunk(dispatch, state) {
    // console.log(state().user.user.id, "<==== wow");
    try {
      console.log(
        obj,
        "<=================================================================================="
      );
      let formData = new FormData();
      formData.append("logo", obj.image);
      formData.append("type", obj.type);
      formData.append("id", state().user.user.id);
      console.log(formData);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/updateLineup`,
        formData
      );
      console.log(response.data, "<=========");
      if (obj.type === "image1") {
        dispatch({
          type: SMALL_IMAGE_CHANGED,
          payload: response.data.lineupImage1,
        });
      } else if (obj.type === "image3") {
        dispatch({
          type: SMALL_IMAGE3_CHANGED,
          payload: response.data.lineupImage3,
        });
      } else {
        dispatch({
          type: SMALL_IMAGE2_CHANGED,
          payload: response.data.lineupImage2,
        });
      }
    } catch (e) {
      console.log(e);
    }

    // console.log(response.data)
    // lineupReducer({
    //   type: SMALL_IMAGE_CHANGED,
    //   payload: response.data.linup.smallImage1,
    // });
  };
}

const initialState = {
  names: {
    0: "player 1",
    1: "player 2",
    2: "player 3",
    3: "player 4",
    4: "player 5",
    5: "player 6",
    6: "player 7",
    7: "player 8",
    8: "player 9",
    9: "player 10",
    10: "player 11",
    11: "player 12",
    12: "player 13",
    13: "player 14",
    14: "player 15",
    15: "player 16",
    16: "player 17",
    17: "player 18",
    18: "player 19",
    19: "player 20",
    20: "player 21",
    21: "player 22",
    22: "player 23",
    23: "player 24",
    24: "player 25",
    25: "player 26",
    26: "player 27",
    27: "player 28",
    28: "player 29",
    29: "player 30",
    30: "player 31",
    31: "player 32",
    32: "player 33",
    33: "player 34",
    34: "player 35",
    35: "player 36",
    36: "player 37",
    37: "player 38",
    38: "player 39",
    39: "player 40",
    40: "player 41",
    41: "player 42",
    42: "player 43",
    43: "player 44",
    44: "player 45",
    45: "player 46",
    46: "player 47",
    47: "player 48",
    48: "player 49",
    49: "",
  },
};

export function namesReducer(state = initialState, action) {
  switch (action.type) {
    case NAMES_CHANGED:
      return { ...state, names: action.payload };
    default:
      return state;
  }
}

//selectors
export const getNames = (state) => state.names.names;

//action types
export const NAMES_CHANGED = "names/nameChanged";

const initialState = {
  blockOne: {
    startTime: "",
    endTime: "",
    pitcher: "",
    fungo: "",
    bucket: "",
    hitters: [
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  blockTwo: {
    startTime: "",
    endTime: "",
    pitcher: "",
    fungo: "",
    bucket: "",
    hitters: ["", "", "", "", "", ""],
  },
  blockThree: {
    startTime: "",
    endTime: "",
    pitcher: "",
    fungo: "",
    bucket: "",
    hitters: ["", "", "", "", "", ""],
  },
  blockFour: {
    startTime: "",
    endTime: "",
    pitcher: "",
    fungo: "",
    bucket: "",
    hitters: ["", "", "", "", "", ""],
  },
};

export function BPScheduleReducer(state = initialState, action) {
  switch (action.type) {
    case BLOCK_ONE_CHANGED:
      return { ...state, blockOne: action.payload };
    case BLOCK_TWO_CHANGED:
      return { ...state, blockTwo: action.payload };
    case BLOCK_THREE_CHANGED:
      return { ...state, blockThree: action.payload };
    case BLOCK_FOUR_CHANGED:
      return { ...state, blockFour: action.payload };
    default:
      return state;
  }
}

export const getBlocks = (state) => state.bpSchedule;

export const BLOCK_ONE_CHANGED = "bpschedule/block_one_changed";
export const BLOCK_TWO_CHANGED = "bpSchedule/block_two_changed";
export const BLOCK_THREE_CHANGED = "bpSchedule/block_three_changed";
export const BLOCK_FOUR_CHANGED = "bpSchedule/block_four_changed";

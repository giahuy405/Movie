import { produce } from "immer";

const initialState = {
  films: {},
  user:[],
};
export const adminReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "GET_FILMS":
        draft.films = action.payload;
        break;
        case "GET_LIST_USER":
          draft.user = action.payload;
          break;
      default:
        break;
    }
  });
};

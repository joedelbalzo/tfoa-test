import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState, RootAction } from "./index";

interface CodesState {
  codes: string[];
  activeCode: string | null;
  error: boolean;
}

const initialState: CodesState = {
  codes: [],
  activeCode: null,
  error: false,
};

enum CodesActionTypes {
  REQUEST_CODES = "REQUEST_CODES",
  ACTIVE_CODE_SUCCESS = "ACTIVE_CODE_SUCCESS",
  CODE_FAILURE = "CODE_FAILURE",
}

interface RequestCodesAction {
  type: CodesActionTypes.REQUEST_CODES;
  codes: string[];
}

interface ActiveCodeSuccessAction {
  type: CodesActionTypes.ACTIVE_CODE_SUCCESS;
  code: string;
}

interface CodeFailureAction {
  type: CodesActionTypes.CODE_FAILURE;
}

export type CodesAction = RequestCodesAction | ActiveCodeSuccessAction | CodeFailureAction;

export const codesReducer = (state: CodesState = initialState, action: CodesAction): CodesState => {
  switch (action.type) {
    case CodesActionTypes.REQUEST_CODES:
      return { ...state, codes: action.codes, error: false };
    case CodesActionTypes.ACTIVE_CODE_SUCCESS:
      return { ...state, activeCode: action.code, error: false };
    case CodesActionTypes.CODE_FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
};

export const fetchCodes = () => async (dispatch: Dispatch<CodesAction>) => {
  try {
    const response = await axios.get<string[]>("/api/coupon-codes");
    dispatch({ type: CodesActionTypes.REQUEST_CODES, codes: response.data });
  } catch (error) {
    console.error("Fetching codes failed:", error);
    dispatch({ type: CodesActionTypes.CODE_FAILURE });
  }
};
export const fetchSubmittedCode = (code: string): ThunkAction<void, RootState, unknown, RootAction> => {
  return async (dispatch: Dispatch<RootAction>) => {
    try {
      const response = await axios.get<string[]>("/api/coupon-codes");
      const index = response.data.indexOf(code);
      if (index !== -1) {
        dispatch({ type: CodesActionTypes.ACTIVE_CODE_SUCCESS, code: response.data[index] });
      } else {
        dispatch({ type: CodesActionTypes.CODE_FAILURE });
      }
    } catch (error) {
      console.error("Fetching codes failed:", error);
      dispatch({ type: CodesActionTypes.CODE_FAILURE });
    }
  };
};
export default codesReducer;

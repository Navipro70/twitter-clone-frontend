import {AppStateType, InferActionsType} from "./store";
import { ThunkAction } from "redux-thunk";

let initialState = {
    name: null as null | string
};

type initialStateType = typeof initialState

type ActionType = InferActionsType<typeof actions>

export const userReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "SET_USER":
            return {
                name: action.name
            };
        default:
            return {...state}
    }
};

const actions = {
    setUser: (name: string) => ({
        type: 'SET_USER',
        name
    } as const)
};

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

// export const thunkAuthantication = ():ThunkActionType => async (dispatch) => {
//     const data = await
// };
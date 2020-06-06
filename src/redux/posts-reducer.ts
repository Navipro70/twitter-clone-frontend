import {AppStateType, InferActionsType} from "./store"
import {ThunkAction} from "redux-thunk"
import {TPost} from "../types/types"
import {postsRoute} from "../api/postsRoute"

let initialState = {
    posts: null as null | Array<TPost>
};

type initialStateType = typeof initialState

type ActionType = InferActionsType<typeof postsActions>

export const postsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "SET_POSTS":
            return {
                posts: action.posts
            };
        default:
            return {...state}
    }
};

const postsActions = {
    setUser: (posts: Array<TPost>) => ({
        type: 'SET_POSTS',
        posts
    } as const)
};

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const thunkAuthentication = (): ThunkActionType => async (dispatch) => {
    const data = await postsRoute.getAllPosts();
    dispatch(postsActions.setUser(data))
};

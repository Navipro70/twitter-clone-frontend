import {AppStateType, InferActionsType} from "./store"
import {ThunkAction} from "redux-thunk"
import {TPost} from "../types/types"
import {postsRoute} from "../api/postsRoute"

let initialState = {
    posts: [] as Array<TPost>,
    fetchingPosts: false
};

type initialStateType = typeof initialState

type ActionType = InferActionsType<typeof postsActions>
export const postsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.posts,
            };
        case 'START_FETCHING_POSTS':
            return {
                ...state,
                fetchingPosts: true,
            };
        case 'STOP_FETCHING_POSTS':
            return {
                ...state,
                fetchingPosts: false,
            };
        default:
            return {...state}
    }
};

const postsActions = {
    setPosts: (posts: Array<TPost>) => ({
        type: 'SET_POSTS',
        posts
    } as const),
    stopFetchingPosts: () => ({
        type: 'STOP_FETCHING_POSTS'
    } as const),
    startFetchingPosts: () => ({
        type: 'START_FETCHING_POSTS'
    } as const)
};

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const thunkFetchPosts = (): ThunkActionType => async (dispatch) => {
    try {
        dispatch(postsActions.startFetchingPosts());
        const data = await postsRoute.getAllPosts();
        dispatch(postsActions.setPosts(data))
    } catch (err) {
        console.error(err)
    } finally {
        dispatch(postsActions.stopFetchingPosts())
    }
};

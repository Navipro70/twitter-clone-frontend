import {AppStateType, InferActionsType} from "./store"
import {ThunkAction} from "redux-thunk"
import {error, TPost} from "../types/types"
import {postsRoute} from "../api/postsRoute"

let initialState = {
    posts: [] as Array<TPost>,
    fetchingPosts: false,
    sendingPost: false,
    error: '',
    generalError: ''
};

type initialStateType = typeof initialState

type ActionType = InferActionsType<typeof postsActions>
export const postsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: [...action.posts],
            };
        case 'ADD_POST':
            return {
                ...state,
                posts: [action.post, ...state.posts]
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
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            };
        case "SET_GENERAL_ERROR":
            return {
                ...state,
                generalError: action.generalError
            };
        case "START_SENDING_POST":
            return {
                ...state,
                sendingPost: true
            };
        case "STOP_SENDING_POST":
            return {
                ...state,
                sendingPost: false
            }
        default:
            return {...state}
    }
};

const postsActions = {
    setPosts: (posts: Array<TPost>) => ({
        type: 'SET_POSTS',
        posts
    } as const),
    addPost: (post: TPost) => ({
        type: 'ADD_POST',
        post
    } as const),
    setError: (error: string) => ({
        type: 'SET_ERROR',
        error
    } as const),
    setGeneralError: (generalError: string) => ({
        type: 'SET_GENERAL_ERROR',
        generalError
    } as const),
    stopFetchingPosts: () => ({
        type: 'STOP_FETCHING_POSTS'
    } as const),
    startFetchingPosts: () => ({
        type: 'START_FETCHING_POSTS'
    } as const),
    startSendingPost: () => ({
        type: 'START_SENDING_POST'
    } as const),
    stopSendingPost: () => ({
        type: 'STOP_SENDING_POST'
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

export const thunkAddPost = (postText: string, setText: (value: string) => void): ThunkActionType => async (dispatch) => {
    try {
        dispatch(postsActions.startSendingPost());
        const data: TPost | error = await postsRoute.createPost(postText);
        if ("error" in data) {
            dispatch(postsActions.setError(data.error!))
        } else if ("general" in data) {
            dispatch(postsActions.setGeneralError(data.general!))
        } else {
            dispatch(postsActions.addPost(data as TPost));
            setText('')
        }
    } catch (err) {
        console.error(err)
    } finally {
        dispatch(postsActions.stopSendingPost())
    }
};
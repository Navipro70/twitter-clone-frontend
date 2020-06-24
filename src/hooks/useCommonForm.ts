import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {useEffect} from "react";
import {usersActions} from "../redux/user-reducer";

export const useCommonForm = (): [any, boolean, boolean, string, any] => {
    const dispatch = useDispatch();
    const history = useHistory();
    let requireSignUpData = useSelector((state: AppStateType) => ({
        auth: state.usersPage.authenticated,
        sendingData: state.usersPage.sendingData,
        generalError: state.usersPage.generalError
    }));
    let {auth, sendingData, generalError} = requireSignUpData;
    useEffect(() => {
        return () => {
            dispatch(usersActions.removeGeneralError())
        }
    }, [dispatch]);
    return [history, auth, sendingData, generalError, dispatch]
};
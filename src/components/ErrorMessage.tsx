import React, {FC} from "react";

type TProps = {
    touched: boolean | undefined
    error: string | undefined | boolean
}
export const ErrorMessage: FC<TProps> = ({touched, error}) => (
    <>
        {touched && error && <div style={{color: "red"}}>{error}</div>}
    </>
);

import React, {useEffect, useReducer, useRef, useCallback} from 'react';
import $ from "jquery";
import classNames from "classnames";

enum InfoButtonActionTypes {
    MouseIn="MouseIn",
    MouseOut="MouseOut",
    Click="Click",
}

const initState = {
    pinned: false,
    isMouseIn: false
};

const infoButtonReducer = (state: typeof initState, action: {type: InfoButtonActionTypes}) => {
    switch(action.type) {
        case InfoButtonActionTypes.MouseIn:
            return {
                ...state,
                isMouseIn: true,
            };
        case InfoButtonActionTypes.MouseOut:
            return {
                ...state,
                isMouseIn: false,
            };
        case InfoButtonActionTypes.Click:
            return {
                ...state,
                pinned: !state.pinned,
            };
        default:
            return state;
    }
};

const InfoButton: React.FC<{info: string}> = ({info}) => {
    const btt = useRef<HTMLButtonElement|null>(null);
    const [state, dispatch] = useReducer(infoButtonReducer, initState);

    useEffect(() => {
        if (btt.current !== null) {
            $(btt.current).tooltip({
                offset: "50%p, 3px",
                trigger : 'manual'
            });
        }
    }, [btt.current]);

    useEffect(() => {
        if (state.pinned || state.isMouseIn) {
            ($(btt.current as any) as any).tooltip('show');
        }
        if (!state.pinned && !state.isMouseIn) {
            ($(btt.current as any) as any).tooltip('hide');
        }
    }, [state]);

    const handleMouseEnter = useCallback(() => {
        dispatch({type: InfoButtonActionTypes.MouseIn});
    }, [dispatch]);
    const handleMouseLeave = useCallback(() => {
        dispatch({type: InfoButtonActionTypes.MouseOut});
    }, [dispatch]);
    const handleClick = useCallback(() => {
        dispatch({type: InfoButtonActionTypes.Click});
    }, [dispatch]);

    return (
        <button type="button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                ref={btt}
                className={classNames({
                    "bi bi-ico btn btn-link btn-thin ml-2 text-success": true,
                    "bi-info": !state.pinned,
                    "bi-x-circle": !!state.pinned
                })}
                data-toggle="tooltip"
                data-placement="bottom"
                title={info}>
        </button>
    );
};

export default InfoButton;
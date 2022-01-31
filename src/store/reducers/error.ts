import * as actionType from '../actionTypes/actionTypes';

const errorReducer = (state = { error: null }, action: any) => {
    switch (action.type) {
        case actionType.ERROR:
            return { ...state, error: action?.data?.error };
        default:
            return state;
    }
};

export default errorReducer;

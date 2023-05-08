import actionType from "../actions/actionType";


const initialState = {
    value: 0,
};

const appReducer = (state = initialState, action) => {
    const copyState = state;
    switch (action.type) {
        // case actionType.ADMIN_LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //     };

        default:
            return state;
    }
};

export default appReducer;
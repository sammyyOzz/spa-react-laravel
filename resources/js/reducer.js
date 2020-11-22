export const initialState = {
    user: false,
    userId: null
};

const reducer = (state, action) => {

    switch(action.type) {

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.userId
            }

        default:
            return state;
    }
}

export default reducer;

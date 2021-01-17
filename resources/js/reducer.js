export const initialState = {
    user: false,
    userId: null,
    userData: null
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

        case 'SET_USER_DATA':
            return {
                ...state,
                userData: action.userData
            }

        default:
            return state;
    }
}

export default reducer;

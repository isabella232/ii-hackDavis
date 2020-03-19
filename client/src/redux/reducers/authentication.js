const userKind = localStorage.getItem('userKind') || 'Visitor';
const getIsLoggedIn = () => {
    if (userKind !== 'Visitor') {
        return true;
    }
    return false;
}
const isLoggedIn = getIsLoggedIn();

const initialState = {
    userKind: userKind,
    isLoggedIn: isLoggedIn
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userKind: localStorage.getItem('userKind'),
                isLoggedIn: getIsLoggedIn()
            }
        case 'LOGOUT':
            return {
                ...state,
                userKind: 'Visitor',
                isLoggedIn: getIsLoggedIn()
            }
        default:
            return state;
    }
}

export default reducer;

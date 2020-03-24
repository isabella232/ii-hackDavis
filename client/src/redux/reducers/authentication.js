const getIsLoggedIn = () => {
    if (localStorage.getItem('userKind') && localStorage.getItem('userKind') !== 'Visitor') {
        return true;
    }
    return false;
}

const userKind = localStorage.getItem('userKind') || 'Visitor';
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

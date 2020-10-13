export const initialState = {
    user:null,
    userType: null,
}

const reducer = (state,action)=>{
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
                userType: action.userType
            }
        default:
            return [...state]
    }
}

export default reducer
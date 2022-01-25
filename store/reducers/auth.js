import {LOGOUT, AUTHENTICATE } from "../actions/auth"

const initialState={
    userToken: null,
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return {userId: action.userId, userToken: action.userToken}
        case LOGOUT:
            return {userId: null, userToken: null}
        default:
            return state
    }
}

export default authReducer
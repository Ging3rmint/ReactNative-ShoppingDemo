import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE = 'AUTHENTICATE'

let timerPtr

const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key='

const webKey = 'AIzaSyCFbogXTAc2lARqd1MFuEzRnBdtemP_kV0'



const saveDataToStorage = (token, userId, expiresIn) => {
    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000).toISOString()

    AsyncStorage.setItem('userData', JSON.stringify({token: token, userId: userId, expiryDate: expirationDate}))
}

const clearLogoutTimer = () => {
    if (timerPtr){
        clearTimeout(timerPtr)
    }
}

const setLogoutTimer = expirationTimer => {
    return dispatch => {
        timerPtr = setTimeout(()=> {
            dispatch(logout())
        }, expirationTimer)
    }
}
export const authenticate = (token, userId, expirationTime) => {
    return async(dispatch) => {
        dispatch(setLogoutTimer(parseInt(expirationTime) * 1000))
        dispatch({type: AUTHENTICATE, userId: userId, userToken: token})
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        try{
            const res = await axios.post(`${signupUrl}${webKey}`,
            JSON.stringify(
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ),
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            dispatch(authenticate(res.data.idToken, res.data.localId, res.data.expiresIn))

            saveDataToStorage(res.data.idToken, res.data.localId, res.data.expiresIn)
        }catch(error)
        {
            throw error
        }
    }
}
export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {type: LOGOUT}
}

export const login = (email, password) => {
    return async dispatch => {
        try{
            const res = await axios.post(`${loginUrl}${webKey}`,
            JSON.stringify(
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ),
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            dispatch(authenticate(res.data.idToken, res.data.localId, res.data.expiresIn))

            saveDataToStorage(res.data.idToken, res.data.localId, res.data.expiresIn)

        }catch(error)
        {
            throw error
        }
    }

}
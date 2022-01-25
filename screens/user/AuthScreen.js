import React, { useState, useEffect } from 'react'
import {ActivityIndicator,Alert, View, Button, KeyboardAvoidingView, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux'
import * as authActions from '../../store/actions/auth'

import {LinearGradient} from 'expo-linear-gradient'
import Input from '../../components/atoms/Input'
import Colors from '../../constants/Colors'

const AuthScreen = (props) => {
    const dispatch = useDispatch()

    const [validation, setValidation] = useState({
        email: true,
        password: true
    })

    const [loginParams, setLoginParams] = useState({
        email: '',
        password: ''
    })

    const [isSignup, setIsSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const validateForm = () => {
        const {email, password} = loginParams

        if (email.length && password.length){
            return true
        }

        if (!email.length){
            setValidation(state => ({...state, email: false}))
        }else{
            setValidation(state => ({...state, email: true}))
        }

        if (!password.length){
            setValidation(state => ({...state, password: false}))
        }else{
            setValidation(state => ({...state, password: true}))
        }

        return false
    }

    const authHandler = async() => {
        const valid = validateForm();
        if (valid){
            setError(null)
            if (!isSignup){
                try{
                    setIsLoading(true)
                    await dispatch(authActions.login(loginParams.email, loginParams.password))
                }catch(error){
                    setIsLoading(false)
                    if (error.response){
                        setError(error.response)
                    }else{
                        console.log(error)
                    }
                }
            }else{
                try{
                    setIsLoading(true)
                    await dispatch(authActions.signup(loginParams.email, loginParams.password))
                }catch(error){
                    setIsLoading(false)
                    if (error.response){
                        setError(error.response)
                    }else{
                        console.log(error)
                    }
                }
            }
        }
        //dispatch(authActions.signup())
    }

    useEffect(()=> {
        if (error){
            const errorMsg = error.data.error.message
            let message = 'Something went wrong!'

            switch (errorMsg){
                case 'INVALID_EMAIL':
                case 'EMAIL_NOT_FOUND':
                    message = 'This account does not exist'
                    break;
                case 'INVALID_PASSWORD':
                    message = 'Wrong password'
                    break;
                case 'EMAIL_EXISTS':
                    message = 'Account already exist'
                    break;
                default: 
                    console.log(errorMsg)
                    break;
            }

            Alert.alert('An Error Occured!', message, [{text: 'Okay'}])
        }
    }, [error])

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <View style={styles.card}>
                    <Input
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        required
                        autoCapitalize="none"
                        errorMessage="Please enter a valid email address."
                        isValid = {validation.email}
                        onChangeText={(text)=> {
                            setLoginParams(state=> ({
                                ...state,
                                email: text
                            }))
                        }}
                    />
                    <Input
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorMessage="Please enter a valid password."
                        isValid = {validation.password}
                        onChangeText={(text)=> {
                            setLoginParams(state=> ({
                                ...state,
                                password: text
                            }))
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        {isLoading? <ActivityIndicator/> : <Button title={isSignup? "Sign Up" : "Login"} color={Colors.primaryColor} onPress={()=> {authHandler()}}/>}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title={`Switch to ${isSignup? 'Login' : 'Sign Up'}`} color={Colors.accentColor} onPress={() => setIsSignup(prevState => !prevState)}/>
                    </View>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    card:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        width: '80%'
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer:{
        marginTop: 10
    }
})

export default AuthScreen

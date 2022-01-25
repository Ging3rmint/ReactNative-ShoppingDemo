import React,{useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from 'react-redux'

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth'

const StartScreen = (props) => {
    const {navigation} = props
    const dispatch = useDispatch()

    useEffect(()=> {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')

            if (!userData){
                navigation.navigate('Login')
                return
            }

            const {token, userId, expiryDate} = JSON.parse(userData)
            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userId){
                navigation.navigate('Login')
                return
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime()

            dispatch(authActions.authenticate(token, userId, expirationTime))
        }

        tryLogin()
    }, [])

  return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size='large' color={Colors.primaryColor}/>
  </View>;
};

export default StartScreen;

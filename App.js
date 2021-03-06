import React, {useState} from 'react'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

import AppNavigator from './navigation/AppNavigator'
import RegularText from './components/atoms/RegularText'

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=> setFontLoaded(true)} onError={(err)=> console.log(err)}/>
  }

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>

  );
}

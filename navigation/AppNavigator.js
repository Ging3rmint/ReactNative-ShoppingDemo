import React from 'react'
import Colors from '../constants/Colors'
import {Platform} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import * as authActions from '../store/actions/auth'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductsDetailScreen from '../screens/shop/ProductsDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import { Ionicons } from '@expo/vector-icons'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartScreen from '../screens/StartScreen'

const defaultNavOptions = {
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android'? 'white' : Colors.primaryColor,
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    }
}

const Stack = createNativeStackNavigator()

const ProductStackNavigator = () => {
   return <Stack.Navigator screenOptions={defaultNavOptions}>
        <Stack.Screen name="AllProducts" component={ProductsOverviewScreen} options={{title: 'All Products'}}/>
        <Stack.Screen name="ProductDetail" component={ProductsDetailScreen} options={{title: 'Product Detail'}}/>
        <Stack.Screen name="Cart" component={CartScreen} options={{title: 'Your Cart'}}/>
    </Stack.Navigator>
}

const OrdersStackNavigator = () => {
    return <Stack.Navigator screenOptions={defaultNavOptions}>
         <Stack.Screen name="Orders" component={OrdersScreen} options={{title: 'Your Orders'}}/>
     </Stack.Navigator>
 }

 const UserStackNavigator = () => {
    return <Stack.Navigator screenOptions={defaultNavOptions}>
         <Stack.Screen name="Admin" component={UserProductsScreen} options={{title: 'Admin'}}/>
         <Stack.Screen name="Edit" component={EditProductScreen} options={{title: 'Edit Products'}}/>
     </Stack.Navigator>
 }

 const AuthNavOptions = {
    headerShown: false,
}

 const LoginStackNavigator = () => {
    return <Stack.Navigator initialRouteName='StartScreen' screenOptions={AuthNavOptions}>
         <Stack.Screen name="StartScreen" component={StartScreen} options={{title: 'Auth'}}/>
         <Stack.Screen name="Login" component={AuthScreen} options={{title: 'Login'}}/>
     </Stack.Navigator>
 }

const Drawer = createDrawerNavigator()

const drawerScreenOptions = {
    headerShown: false,
    drawerActiveTintColor: Colors.primaryColor
}

const DrawerContent = (props) => {
    const dispatch = useDispatch()

    return <DrawerContentScrollView >
        <DrawerItem 
            label="Logout" 
            icon={({color}) => <Ionicons 
                name={Platform.OS === 'android'? 'md-cart' : 'ios-cart'}
                size={23}
                color={color}/>}
            onPress={() => dispatch(authActions.logout())} 
        />
        <DrawerItemList {...props}/>
    </DrawerContentScrollView>
}

const DrawerNavigator = () => {
    return <Drawer.Navigator 
        initialRouteName='ProdStack' 
        screenOptions={drawerScreenOptions}
        drawerContent={props => <DrawerContent {...props}/>}
    >
         <Drawer.Screen name="ProdStack" component={ProductStackNavigator} 
            options={{
                title: 'Products', 
                drawerIcon: drawerConfig=> (
                <Ionicons 
                    name={Platform.OS === 'android'? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.color}
                />)
                }}
        />
         <Drawer.Screen name="OrderStack" component={OrdersStackNavigator} 
            options={{
                title: 'Orders', 
                drawerIcon: drawerConfig=> (
                <Ionicons 
                    name={Platform.OS === 'android'? 'md-list' : 'ios-list'}
                    size={23}
                    color={drawerConfig.color}
                />)
                }}/>
         <Drawer.Screen name="AdminStack" component={UserStackNavigator} 
            options={{
                title: 'Admin', 
                drawerIcon: drawerConfig=> (
                <Ionicons 
                    name={Platform.OS === 'android'? 'md-create' : 'ios-create'}
                    size={23}
                    color={drawerConfig.color}
                />)
                }}/>
     </Drawer.Navigator>
 }

const AppNavigator = () => {
    const loginToken = useSelector(state => state.auth.userToken)

    return (
        <NavigationContainer>
            {loginToken? 
            <DrawerNavigator/>
            : 
            <LoginStackNavigator/>
            }
        </NavigationContainer>
    )
}

export default AppNavigator

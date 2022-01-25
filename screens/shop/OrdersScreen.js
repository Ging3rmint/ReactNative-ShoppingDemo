import React, {useLayoutEffect, useEffect} from 'react'
import {FlatList, Platform, View} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import * as orderActions from '../../store/actions/order'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/molecules/HeaderButton'

import OrderItem from '../../components/molecules/OrderItem'
import RegularText from '../../components/atoms/RegularText'

const OrdersScreen = (props) => {
    const {navigation} = props
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=> {
            dispatch(orderActions.fetchOrders())
        })

        return unsubscribe
    },[dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} onPress={() => navigation.toggleDrawer()}/>
            </HeaderButtons>,
            headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName={Platform.OS === 'android'? 'md-cart' : 'ios-cart'} onPress={() => navigation.navigate('Cart')}/>
            </HeaderButtons>
        });
    }, [navigation]);

    if (!orders.length){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <RegularText>No order found</RegularText>
        </View>
    }
    return (
        <FlatList data={orders} renderItem={itemData => <OrderItem item = {itemData.item}/>}/>
    )
}


export default OrdersScreen

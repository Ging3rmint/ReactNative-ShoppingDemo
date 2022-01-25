import React,{useState} from 'react'
import {View, FlatList, Button, Text, StyleSheet, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'

import CartItem from '../../components/molecules/CartItem'
import BoldText from '../../components/atoms/BoldText'
import RegularText from '../../components/atoms/RegularText'

const CartScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const {navigation} = props

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const cartItemsArr = []
        for (const key in state.cart.items){
            cartItemsArr.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return cartItemsArr
    })

    const dispatch = useDispatch()

    const onOrderNowHandler = async () => {
        setIsLoading(true)
        setError(null)

        try{
            await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
            setIsLoading(false)
            // navigation.navigate('Orders')
        }catch (error){
            setError(error)
        }

        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <BoldText style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text></BoldText>
                {isLoading?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={Colors.primaryColor}/>
                </View>
                :<Button title="Order Now" disabled={cartItems.length === 0} onPress={onOrderNowHandler}/>}
            </View>
            <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={itemData => <CartItem item={itemData.item} onRemove={()=> {dispatch(cartActions.removeFromCart(itemData.item.productId))}}/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18
    },
    amount: {
        color: Colors.primaryColor
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CartScreen

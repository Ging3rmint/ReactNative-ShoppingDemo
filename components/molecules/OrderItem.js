import React, {useState} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import BoldText from '../atoms/BoldText'
import RegularText from '../atoms/RegularText'

import CartItem from './CartItem'

const OrderItem = (props) => {
    const {item} = props
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <BoldText style={styles.totalAmount}>${item.totalAmount.toFixed(2)}</BoldText>
                <RegularText style={styles.date}>{item.readableDate}</RegularText>
            </View>
            <Button color={Colors.primaryColor} title={showDetails? "Hide Details" : "Show Details"}
                onPress={()=> setShowDetails(prevState => !prevState)}
            />
            {showDetails && 
                <View style={styles.detailContainer}>
                    {item.items.map(cartItem => {
                        return <CartItem key={cartItem.productId} disableDelete item={cartItem}/>
                    })}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20
    },
    totalAmount: {
        fontSize: 16
    },
    date: {
        fontSize: 16,
        color: '#888'
    },
    detailContainer:{
        width: '100%'
    }
})

export default OrderItem

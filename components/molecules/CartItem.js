import React from 'react'
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import RegularText from '../atoms/RegularText'
import BoldText from '../atoms/BoldText'

const CartItem = (props) => {
    const {item} = props
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <RegularText style={styles.text}>{item.quantity} </RegularText> 
                <BoldText numberOfLines={1} style={styles.title}>{item.productTitle}</BoldText>
            </View>
            <View style={styles.itemData}>
                <BoldText style={styles.text}>${item.sum.toFixed(2)}</BoldText>
                {props.disableDelete || <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons 
                        name={Platform.OS === 'android'? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="red"
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,

    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16
    },
    title: {
        fontSize: 16,
        maxWidth: 150,
        marginRight: 10
    },
    deleteButton: {
        marginLeft: 20
    }
})

export default CartItem

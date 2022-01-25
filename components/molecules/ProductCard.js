import React from 'react'
import {View, StyleSheet, Image, Button, TouchableOpacity, Platform, TouchableNativeFeedback} from 'react-native'
import Colors from '../../constants/Colors'

import BoldText from '../atoms/BoldText'
import RegularText from '../atoms/RegularText'

const ProductCard = (props) => {
    let TouchableCmp = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchableWrapper}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageWrapper}>
                            <Image style={styles.image} source={{uri: props.image}}/>
                        </View>
                        <View style={styles.header}>
                            <BoldText style={styles.title}>{props.title}</BoldText>
                            <RegularText style={styles.price}>${props.price.toFixed(2)}</RegularText>
                        </View>
                        <View style={styles.buttonGroup}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    imageWrapper:{
        height: '60%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },  
    image: {
        height: '100%',
        width: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    touchableWrapper: {
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default ProductCard

import React, {useLayoutEffect} from 'react'
import {ScrollView, View, Image, Button, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

import BoldText from '../../components/atoms/BoldText'
import RegularText from '../../components/atoms/RegularText'

const ProductsDetailScreen = (props) => {
    const {navigation, route} = props

    const productId = route.params.productId
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch()

    const onAddToCartHandler = (product) => {
        dispatch(cartActions.addToCart(product))
    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerTitle: selectedProduct.title
        })
    },[navigation])

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.buttonGroup}>
                <Button color={Colors.primaryColor} title='Add to Cart' onPress={()=> onAddToCartHandler(selectedProduct)}/>
            </View>
            <RegularText style={styles.price}>${selectedProduct.price.toFixed(2)}</RegularText>
            <RegularText style={styles.desc}>{selectedProduct.description}</RegularText>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    desc: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    buttonGroup: {
        marginVertical: 10,
        alignItems: 'center'
    }
})

export default ProductsDetailScreen

import React, {useLayoutEffect, useEffect, useState, useCallback} from 'react'

import {FlatList, View, Button, Platform, ActivityIndicator, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'

import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/molecules/HeaderButton'

import Colors from '../../constants/Colors'
//atoms
import BoldText from '../../components/atoms/BoldText'
//molecules
import ProductCard from '../../components/molecules/ProductCard'
import RegularText from '../../components/atoms/RegularText'

const ProductsOverviewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState('')

    const {navigation} = props

    const allProducts = useSelector(state => state.products.availableProducts)

    const onViewDetailHandler = (itemData) => {
        navigation.navigate('ProductDetail', {productId: itemData.item.id})
    }

    const dispatch = useDispatch()

    const onAddToCartHandler = (itemData) => {
        dispatch(cartActions.addToCart(itemData.item))
        navigation.navigate('Cart')
    }

    const loadProducts = useCallback(async() => {
        setError(null)
        setIsRefreshing(true)

        try{
            await dispatch(productsActions.fetchProducts())
        }catch (error) {
            setError(error.message)
        }

        setIsRefreshing(false)
    },[dispatch])

    // useEffect(() => {
    //     loadProducts()
    // }, [dispatch, loadProducts])

    useLayoutEffect(()=> {
        setIsLoading(true)
        const unsubscribe = navigation.addListener('focus', loadProducts)
        setIsLoading(false)

        return unsubscribe
    }, [loadProducts])

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

    if (error) {
        return <View style={styles.loader}>
            <RegularText>An error has occured!</RegularText>
            <Button title='Try again' onPress={loadProducts}/>
        </View>
    }

    if (isLoading) {
        return <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.primaryColor}/>
        </View>
    }

    if (!isLoading && allProducts.length === 0){
        <View style = {styles.loader}>
            <RegularText>No products found. Start adding some!</RegularText>
        </View>
    }

    return (
        <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={allProducts} 
            renderItem={itemData => 
                <ProductCard 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price} 
                    onSelect={()=>{
                        onViewDetailHandler(itemData)
                    }}
                >
                    <Button color={Colors.primaryColor} title='View Details' onPress={() => onViewDetailHandler(itemData)}/>
                    <Button color={Colors.primaryColor} title='To Cart' onPress={()=> onAddToCartHandler(itemData)}/>
                </ProductCard>
                }
        />
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ProductsOverviewScreen

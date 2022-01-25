import React, {useLayoutEffect} from 'react'
import {View, FlatList, Alert, Button, Platform} from 'react-native'
import {useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/molecules/HeaderButton'
import Colors from '../../constants/Colors'
import ProductCard from '../../components/molecules/ProductCard'

import {useDispatch} from 'react-redux'
import * as productsActions from '../../store/actions/products'
import RegularText from '../../components/atoms/RegularText'

const UserProductsScreen = (props) => {
    const {navigation} = props
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android'? 'md-menu' : 'ios-menu'} onPress={() => navigation.toggleDrawer()}/>
            </HeaderButtons>,
            headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add' iconName={Platform.OS === 'android'? 'md-create' : 'ios-create'} onPress={() => navigation.navigate('Edit')}/>
            </HeaderButtons>
        });
    }, [navigation]);

    const onDeleteItemHandler = (itemData) => {
        Alert.alert('Are you sure?', 
        'Do you really want to delete this item?', 
        [{text: 'No', style: 'default'}, {text: 'Yes', style: 'destructive', onPress:()=> {
            const productId = itemData.item.id
            dispatch(productsActions.deleteProduct(productId))
        }}])
    }

    const onEditItemHandler = (itemData) => {
        navigation.navigate('Edit',{productId: itemData.item.id})
    }

    const onViewDetailHandler = (itemData) => {
        navigation.navigate('ProductDetail', {productId: itemData.item.id})
    }

    if (!userProducts.length){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><RegularText> 
            No product available 
        </RegularText></View>
    }

    return (
        
        <FlatList data={userProducts} 
            renderItem={itemData => 
                <ProductCard 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price}
                    onSelect={() => onViewDetailHandler(itemData)}
                >
                    <Button color={Colors.primaryColor} title='Edit' onPress={() => onEditItemHandler(itemData)}/>
                    <Button color={Colors.primaryColor} title='Delete' onPress={()=> onDeleteItemHandler(itemData)}/>
                </ProductCard>
        }/>
    )
}

export default UserProductsScreen

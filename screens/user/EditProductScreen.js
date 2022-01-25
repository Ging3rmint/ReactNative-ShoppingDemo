import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react'
import {View, TextInput, ScrollView, Platform, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import * as productsAction from '../../store/actions/products'

import Colors from '../../constants/Colors'
import RegularText from '../../components/atoms/RegularText'
import BoldText from '../../components/atoms/BoldText'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/molecules/HeaderButton'

const EditProductScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [productParams, setProductParams] = useState({
        title: '',
        imageUrl: '',
        price: '',
        description: ''
    }) 

    const {navigation} = props
    const dispatch = useDispatch()

    let productId = null
    let product = null

    if (props.route.params){
        productId = props.route.params.productId
        product = useSelector(state => state.products.userProducts.find(product => product.id === productId))
    }

    const onSaveProductHandler = async() => {
        let thisProduct = {...productParams, price: +productParams.price}
        setIsLoading(true)
        setError(null)

        try{
            if (productId){
                thisProduct.id = productId
                await dispatch(productsAction.updateProduct(thisProduct))
                setIsLoading(false)
            }else{
                await dispatch(productsAction.createProduct(thisProduct))
                setIsLoading(false)
            }
            setTimeout(()=> navigation.goBack(), 100)
            
        }catch (error) {
            if (error.response){
                setError(error.response)
            }else{
                console.log(error)
            }
        }

        setIsLoading(false)
    }

    const onInputHandler = (text, key) => {
        let isValid = true
        
        if (isValid){
            setProductParams(productParams => ({...productParams, [key]: text}))
        }
    }

    useEffect(()=> {
        if (productId){
            setProductParams({title: product.title, imageUrl: product.imageUrl, price: product.price, description: product.description})
        }
    }, [product])

    useEffect(()=> {
        if (error){
            let message = error.data.error.message
            console.log(error)
            Alert.alert('An error occured!', message, [{text: 'Okay'}])
        }
    }, [error])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: product != null? 'Edit Product' : 'Add Product',
            headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' iconName={Platform.OS === 'android'? 'md-checkmark' : 'ios-checkmark'} onPress={() => onSaveProductHandler()}/>
            </HeaderButtons>
        });
    }, [navigation, productParams]);

    if (isLoading) {
        return <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.primaryColor}/>
        </View>
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <BoldText style={styles.label}>Title</BoldText>
                    <TextInput 
                        value={productParams.title} 
                        style={styles.input}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        onChangeText={
                            text => onInputHandler(text, 'title')
                        }
                    />
                </View>
                <View style={styles.formControl}>
                    <BoldText style={styles.label}>Image Url</BoldText>
                    <TextInput 
                        value={productParams.imageUrl} 
                        style={styles.input}
                        keyboardType='default'
                        onChangeText={
                            text => onInputHandler(text, 'imageUrl')
                        }
                    />
                </View>
                {productId === null && <View style={styles.formControl}>
                    <BoldText style={styles.label}>Price</BoldText>
                    <TextInput 
                        value={productParams.price} 
                        style={styles.input}
                        keyboardType='decimal-pad'
                        onChangeText={
                            text => onInputHandler(text, 'price')
                        }
                    />
                </View>}
                <View style={styles.formControl}>
                    <BoldText style={styles.label}>Description</BoldText>
                    <TextInput 
                        value={productParams.description} 
                        style={styles.input}
                        onChangeText={
                            text => onInputHandler(text, 'description')
                        }
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    loader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EditProductScreen

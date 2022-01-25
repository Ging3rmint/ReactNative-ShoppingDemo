import axios from 'axios'
import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

const firebaseUrl = 'https://rn-shopping-db-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        const onSuccess = (res) => {
            const productData = []

            for (const key in res.data){
                productData.push(new Product(key, res.data[key].ownerId, res.data[key].title, res.data[key].imageUrl, res.data[key].description, res.data[key].price))
            }

            dispatch({type: SET_PRODUCTS, products: productData, userProducts: productData.filter(prod => prod.ownerId === userId)})
        }

        try{
            const res = await axios.get(`${firebaseUrl}products.json`)

            return onSuccess(res)
        }catch(error){
            throw error
        }
    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.userToken
        try{
            await axios.delete(`${firebaseUrl}products/${productId}.json?auth=${token}`)
        
            dispatch ({type: DELETE_PRODUCT, productId: productId})
        }catch (error){
            throw error
        }
    }
}

export const createProduct = productParams => {
    return async (dispatch, getState) => {
        const token = getState().auth.userToken
        const userId = getState().auth.userId

        const onSuccess = (res) => {
            dispatch({
                type: CREATE_PRODUCT, 
                productParams: {...productParams, id: res.data.name}
            })
        }

        //async code here
        try{
            const res = await axios.post(`${firebaseUrl}products.json?auth=${token}`, 
            JSON.stringify({
                title: productParams.title,
                description: productParams.description,
                price: productParams.price,
                imageUrl: productParams.imageUrl,
                ownerId: userId
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status != 200){
                console.log(res)
            }
            return onSuccess(res)
        }catch (error){
            throw error
        }
    }
}

export const updateProduct = productParams => {
    return async (dispatch, getState) => { //we can use redux thunk to get all state
        const token = getState().auth.userToken

        try{
            await axios.patch(`${firebaseUrl}products/${productParams.id}.json?auth=${token}`,           
            JSON.stringify({
                title: productParams.title,
                description: productParams.description,
                imageUrl: productParams.imageUrl
            }),{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        
        dispatch({type: UPDATE_PRODUCT, productParams: productParams})

        }catch (error){
            throw error
        }
    }

}

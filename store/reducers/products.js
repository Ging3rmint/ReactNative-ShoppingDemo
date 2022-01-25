import PRODUCTS from '../../data/dummy-data'
import Product from '../../models/product'
import { DELETE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS, CREATE_PRODUCT } from '../actions/products'

const initialState = {
    availableProducts: [],
    userProducts: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_PRODUCTS:
            return{
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.productId),
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(action.productParams.id, 
            action.productParams.ownerId, action.productParams.title, action.productParams.imageUrl, action.productParams.description, action.productParams.price)

            return{
                ...state,
                userProducts: [...state.userProducts, newProduct],
                availableProducts: [...state.availableProducts, newProduct]
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(product => product.id === action.productParams.id)
            const {id, title, imageUrl, description} = action.productParams

            const updateProduct = new Product(id, 
            state.userProducts[productIndex].ownerId, title, imageUrl, description, state.userProducts[productIndex].price)
            
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updateProduct

            return{
                ...state,
                userProducts: updatedUserProducts,
                availableProducts: [...state.availableProducts.filter(product => product.id !== id), updateProduct],
            }
        default:
            return state
    }
}

export default productsReducer
import CartItem from "../../models/cart-item"
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from "../actions/order"
import { DELETE_PRODUCT } from "../actions/products"

const initialState = {
    items: {},
    totalAmount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            let updateOrNewCartItem;

            if (state.items[addedProduct.id]){
                updateOrNewCartItem = new CartItem(state.items[addedProduct.id].quantity + 1, prodPrice, prodTitle, state.items[addedProduct.id].sum + prodPrice)

            }else{
                updateOrNewCartItem = new CartItem (1, prodPrice, prodTitle, prodPrice)
            }

            return{
                items: {...state.items, [addedProduct.id]: updateOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_FROM_CART:
            const productId = action.productId
            const product = state.items[productId]
            const {quantity, productPrice} = product
            const updatedTotal = state.totalAmount - productPrice

            if (quantity > 1){
                return {
                    items: {...state.items, [productId]: new CartItem(quantity - 1, product.productPrice, product.productTitle, product.sum - product.productPrice)},
                    totalAmount: updatedTotal
                }
            }else{
                const updatedCartItems = {...state.items}
                delete updatedCartItems[productId]

                return {
                    items: updatedCartItems,
                    totalAmount: updatedTotal
                }
            }
        case ADD_ORDER:
            return initialState
        case DELETE_PRODUCT:
            if (!state.items[action.productId]){
                return state
            }

            const updatedItems = {...state.items}
            const itemTotal = state.items[action.productId].sum
            delete updatedItems[action.productId]

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
        default:
            return state
        }
}

export default cartReducer
import { ADD_ORDER, SET_ORDERS } from "../actions/order"

import Order from "../../models/order"

const initialState = {
    orders: []
}

export default (state= initialState, action) => {
    switch(action.type){
        case SET_ORDERS:
            return{
                orders: action.orders
            }
        case ADD_ORDER:
            const newOrder = new Order(new Date().toString(), action.orderData.items, action.orderData.amount, new Date())

            return{
                orders: [...state.orders, newOrder]
            }
        default:
            return state
    }
}
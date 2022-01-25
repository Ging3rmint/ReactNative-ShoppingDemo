import axios from 'axios'
import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

const firebaseUrl = 'https://rn-shopping-db-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try{
            const res = await axios.get(`${firebaseUrl}orders/${userId}.json`)
            const ordersData = []

            for (const key in res.data){
                ordersData.push(new Order(
                    key,
                    res.data[key].items,
                    res.data[key].amount,
                    res.data[key].date
                ))
            }
            
            dispatch({type: SET_ORDERS, orders: ordersData})
        }catch (error){
            throw error
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    const date = new Date()

    return async (dispatch, getState) => {
        const token = getState().auth.userToken
        const userId = getState().auth.userId

        try{
            const res = await axios.post(`${firebaseUrl}orders/${userId}.json?auth=${token}`,
            JSON.stringify(
                {
                    items: cartItems,
                    amount: totalAmount,
                    date: date.toISOString()
                }
            ),
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            )

            dispatch({type: ADD_ORDER, orderData: {items: cartItems, amount: totalAmount, date: date}})
        }catch(error){
            throw error
        }   
    }

}
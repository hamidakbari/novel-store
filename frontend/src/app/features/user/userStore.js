import { createContext, useReducer } from 'react';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  paymentMethod: localStorage.getItem('paymentMethod')
    ? localStorage.getItem('paymentMethod')
    : '',
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, userInfo: null, cartItems: [], paymentMethod: '' };
    case 'USER_LIKE':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          favouriteBooks: [...state.userInfo.favouriteBooks, action.payload],
        },
      };
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existedItem = state.cartItems.filter(
        (item) => item._id === newItem._id
      );

      if (existedItem.length === 0) {
        localStorage.setItem(
          'cartItems',
          JSON.stringify([...state.cartItems, newItem])
        );
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      } else {
        return {
          ...state,
        };
      }
    case 'CART_REMOVE_ITEM':
      const cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload.id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cartItems: cartItems,
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case 'PAYMENT_METHOD_CLEAR':
      return {
        ...state,
        paymentMethod: '',
      };
    case 'CART_CLEAR':
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export const UserStore = createContext();

const UserStoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <UserStore.Provider value={value}>{props.children}</UserStore.Provider>
  );
};
export default UserStoreProvider;

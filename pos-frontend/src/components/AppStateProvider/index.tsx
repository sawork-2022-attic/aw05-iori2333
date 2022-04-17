import React, { Dispatch, useCallback, useMemo, useReducer } from 'react';

export interface Product {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface Item {
  product: Product;
  quantity: number;
}

export interface AppState {
  filter: string;
  products: Product[];
  cart: Item[];
}

export type ActionType =
  | 'ADD_CART'
  | 'REMOVE_CART'
  | 'MODIFY_CART'
  | 'SET_FILTER';

interface Action {
  type: ActionType;
  payload: unknown;
}

export const AppContext = React.createContext<[AppState, Dispatch<Action>]>([
  {
    filter: '',
    products: [],
    cart: []
  },
  () => {}
]);

function AppStateProvider(props: { children: React.ReactNode }) {
  const initState = useMemo(() => {
    return {
      filter: '',
      products: [],
      cart: []
    };
  }, []);

  const reducer = useCallback((state: AppState, action: Action) => {
    switch (action.type) {
      case 'ADD_CART': {
        const { productId } = action.payload as { productId: string };
        const product = state.products.find(p => p.productId === productId);
        if (product) {
          const item = state.cart.find(i => i.product.productId === productId);
          if (item) {
            return {
              ...state,
              cart: state.cart.map(i =>
                i.product.productId === productId
                  ? {
                      product: product,
                      quantity: i.quantity + 1
                    }
                  : i
              )
            };
          } else {
            return {
              ...state,
              cart: [...state.cart, { product, quantity: 1 }]
            };
          }
        }
        return state;
      }
      case 'MODIFY_CART': {
        const { productId, quantity } = action.payload as {
          productId: string;
          quantity: number;
        };
        return {
          ...state,
          cart: state.cart.map(i =>
            i.product.productId === productId
              ? {
                  product: i.product,
                  quantity
                }
              : i
          )
        };
      }
      case 'REMOVE_CART': {
        const { productId } = action.payload as { productId: string };
        return {
          ...state,
          cart: state.cart.filter(i => i.product.productId !== productId)
        };
      }
      case 'SET_FILTER': {
        const { filter } = action.payload as { filter: string };
        return {
          ...state,
          filter
        };
      }
      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}

export default React.memo(AppStateProvider);

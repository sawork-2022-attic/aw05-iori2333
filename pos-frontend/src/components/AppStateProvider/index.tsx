import React, { Dispatch, useCallback, useMemo, useReducer } from 'react';
import { Item, Product } from '../../models';

export interface AppState {
  filter: string;
  products: Product[];
  cart: Item[];
}

export type ActionType =
  | 'ADD_CART'
  | 'REMOVE_CART'
  | 'MODIFY_CART'
  | 'SET_FILTER'
  | 'SET_PRODUCTS'
  | 'SET_CART';

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
      case 'SET_CART':
        return {
          ...state,
          cart: action.payload as Item[]
        };
      case 'SET_PRODUCTS':
        return {
          ...state,
          products: action.payload as Product[]
        };
      case 'ADD_CART': {
        const { productId } = action.payload as { productId: string };
        const product = state.products.find(p => p.id === productId);
        if (product) {
          const item = state.cart.find(i => i.product.id === productId);
          if (item) {
            return {
              ...state,
              cart: state.cart.map(i =>
                i.product.id === productId
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
        if (quantity <= 0) {
          return {
            ...state,
            cart: state.cart.filter(i => i.product.id !== productId)
          };
        }
        return {
          ...state,
          cart: state.cart.map(i =>
            i.product.id === productId
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
          cart: state.cart.filter(i => i.product.id !== productId)
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

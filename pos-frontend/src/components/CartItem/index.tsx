import React from 'react';
import { Item } from '../AppStateProvider';
import './index.scss';

function CartItem({ item }: { item: Item }) {
  return (
    <div className="cart-item">
      <span>{item.product.productId}</span>
      <span className="button-set">
        <button>-</button>
        <span>{item.quantity}</span>
        <button>+</button>
      </span>
      <button className="remove-btn">Remove</button>
    </div>
  );
}

export default React.memo(CartItem);

import React from 'react';
import Container from '../Container';
import './index.scss';
import { Item } from '../AppStateProvider';
import CartItem from '../CartItem';

const item: Item = {
  product: {
    productId: 'Name'
  },
  quantity: 10
};

function CartContainer({ items }: { items: Item[] }) {
  return (
    <Container className="cart-container" title="Cart">
      <CartItem item={item} />
      {items.map((item: Item) => (
        <CartItem key={item.product.productId} item={item} />
      ))}
    </Container>
  );
}

export default React.memo(CartContainer);

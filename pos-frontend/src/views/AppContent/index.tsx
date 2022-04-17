import React from 'react';
import './index.scss';
import Container from '../../components/Container';
import CartContainer from '../../components/CartContainer';

function AppContent() {
  return (
    <main className="app-content">
      <div className="content-products">
        <Container title="Products">Products</Container>
      </div>
      <div className="content-cart">
        <CartContainer items={[]} />
      </div>
    </main>
  );
}

export default React.memo(AppContent);

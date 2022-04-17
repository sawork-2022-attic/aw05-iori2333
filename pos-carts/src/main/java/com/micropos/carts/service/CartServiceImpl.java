package com.micropos.carts.service;

import com.micropos.carts.model.Cart;
import com.micropos.carts.model.Item;
import com.micropos.carts.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {
    private CartRepository cartRepository;

    @Autowired
    public void setCartRepository(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart getCart() {
        return cartRepository.getCart();
    }

    @Override
    public Cart addToCart(Item item) {
        var cart = getCart();
        cartRepository.addItem(item);
        return cart;
    }

    @Override
    public Item getItem(String id) {
        return getCart().getItems()
            .stream()
            .filter(item -> item.getProduct().equals(id))
            .findFirst()
            .orElse(null);
    }

    @Override
    public Cart removeItem(String id) {
        cartRepository.removeItem(new Item(id, Integer.MAX_VALUE));
        return getCart();
    }

    @Override
    public Cart modifyItem(Item item) {
        if (item.getQuantity() <= 0) {
            return removeItem(item.getProduct());
        }
        cartRepository.modifyItem(item);
        return getCart();
    }

    @Override
    public Item randomItem() {
        var items = getCart().getItems();
        if (items.isEmpty()) {
            return null;
        }
        return items.get((int) (Math.random() * items.size()));
    }
}

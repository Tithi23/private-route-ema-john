import React from 'react';
import Cart from '../Cart/Cart';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import ReviewItem from '../ReviewItem/ReviewItem';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import { useHistory } from 'react-router';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key)
        setCart(newCart);
        removeFromDb(key);
    }
    const history = useHistory()
    const handlePlaceOrder = () => {
        history.push('/shipping');
        clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="btn-regular">Proceed To Shipping</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;
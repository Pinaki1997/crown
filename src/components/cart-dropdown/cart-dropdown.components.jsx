import "./cart-dropdown.styles.scss";

import { useContext, useEffect } from "react";

import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.components";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        setIsCartOpen(false);
        navigate("/checkout");
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )}
            </div>
            <Button onClick={goToCheckoutHandler}>Proceed to Checkout</Button>
        </div>
    );
};
export default CartDropdown;

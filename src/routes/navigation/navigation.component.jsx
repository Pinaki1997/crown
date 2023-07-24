import "./navigation.styles.scss";

import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="nav-link" to="/">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className="nav-link" to="/auth">
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;

import React from 'react';
import {connect} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => 
                    <CartItem key={cartItem.id} item={cartItem}/>)
            }
            
            <CustomButton>Go To Checkout</CustomButton>
        </div>
    </div>
) 

const mapStateToProps = (state) => ({
    cartItems : selectCartItems
})

export default connect(mapStateToProps)(CartDropdown);
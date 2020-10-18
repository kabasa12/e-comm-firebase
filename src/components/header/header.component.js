import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CustomButton from '../cart-dropdown/cart-dropdown.component';
import {auth} from '../../firebase/firebase.util';
import './header.styles.scss';


const Header = ({currentUser}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                Shop
            </Link>
            <Link className="option" to="/contact">
                Contact
            </Link>
            {
                currentUser ?
                <div className="option" onClick={() => auth.signOut()}>Sign Out</div>
                :
                <Link className="option" to="/signin">Sign In</Link>
            }
            <CartIcon />
        </div>
        {  hidden ? null :<CustomButton />}
    </div>
)


const mapStateToProps = ({user :{currentUser},cart :{hidden}}) => ({
    currentUser ,
    hidden
});

export default connect(mapStateToProps)(Header);
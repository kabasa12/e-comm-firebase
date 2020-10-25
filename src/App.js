import React from 'react';
import './App.css';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';
import Header from './components/header/header.component';
import AuthPage from './pages/auth/auth.component';
import CheckOutPage from './pages/checkout/checkout.component';

import {auth,createUserProfileDocument} from './firebase/firebase.util';
import { setCurrentUser} from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component {

  unSubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
          <Route exact path="/signin" render={() => 
                                  this.props.currentUser ? (<Redirect to="/" />) : (<AuthPage />)} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);

import React from 'react';
import './App.css';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';
import Header from './components/header/header.component';
import AuthPage from './pages/auth/auth.component';
import {auth,createUserProfileDocument} from './firebase/firebase.util';
import { setCurrentUser} from './redux/user/user.action';

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
          <Route path="/signin" render={() => 
                                  this.props.currentUser ? (<Redirect to="/" />) : (<AuthPage />)} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = ({ user }) => ({
  currentUser :user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);

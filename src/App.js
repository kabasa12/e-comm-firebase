import React from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';

import HomePage from './pages/homePage/homepage.component';
import ShopPage from './pages/shopPage/shop.component';
import Header from './components/header/header.component';
import AuthPage from './pages/auth/auth.component';
import {auth,createUserProfileDocument} from './firebase/firebase.util';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }

  unSubscribeFromAuth = null;
  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({currentUser:userAuth})
      }
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={AuthPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;

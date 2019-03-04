import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import firebase from 'firebase';


class App extends Component {
  state = {
    loginModalVisible: false,
    registerModalVisible: false,
    loginInfo: {
      username: "",
      password: ""
    },
    authUser: {

    }
  };
  /*
    logout clear window local storage 
    clear session in server
  */

  componentDidMount() {

    firebase.initializeApp({
      apiKey: "AIzaSyApyFmSm-XX6nRB2w9Y2ewbVzyOONhXYIg",
      authDomain: "techkids-hotgirl.firebaseapp.com",
      databaseURL: "https://techkids-hotgirl.firebaseio.com",
      projectId: "techkids-hotgirl",
      storageBucket: "techkids-hotgirl.appspot.com",
      messagingSenderId: "547683338967"
    });


    this.setState({
      authUser: {
        username: window.localStorage.getItem('username'),
        userId: window.localStorage.getItem('userId')
      }
    });
  }
  toggleLogin = () => {
    this.setState({
      loginModalVisible: !this.state.loginModalVisible
    })
  };

  loginInfoChange = (newLoginInfo) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        ...newLoginInfo
      }
    });
  }

  loginSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state.loginInfo);
    //validate form
    if (!this.state.loginInfo.username || !this.state.loginInfo.password) {
      window.alert('Please input username and password');
    } else { //fetch to apiserver
      try {
        const result = await fetch(`http://localhost:3001/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.loginInfo)
        })
          .then(response => response.json({}))

        //success => updateUI
        console.log(result);
        if (!result.success) {
          window.alert(result.message);
        } else {
          window.localStorage.setItem('userId', result.userId);
          window.localStorage.setItem('username', result.username);
          this.toggleLogin();
          this.setState({
            authUser: {
              userId: result.userId,
              username: result.username
            }
          })
        }


      } catch (error) {
        console.log(error);
        window.alert(error.message);
      }
    }

  }

  loginWithFacebook = async () => {
    console.log("abc");
    try {
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      const result = await firebase.auth().signInWithPopup(facebookProvider)
      // console.log(result);
      const idToken = await result.user.getIdToken();

      const verifyTokenResult = await fetch('http://localhost:3001/api/auth/facebook0auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken
        })
      })
      .then(response => response.json());
      console.log(verifyTokenResult);

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          loginModalVisible={this.state.loginModalVisible}
          login={{
            username: this.state.loginInfo.username,
            password: this.state.loginInfo.password,
            toggle: this.toggleLogin,
            loginInfoChange: this.loginInfoChange,
            submitForm: this.loginSubmit,
            loginWithFacebook: this.loginWithFacebook
          }}
          authUser={this.state.authUser}

        />

      </div>
    );
  }
}

export default App;

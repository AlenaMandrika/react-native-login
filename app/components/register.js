import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import axios from 'axios'

export default class register extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'Register',
    headerRight:
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{margin:10,backgroundColor:'orange',padding:10}}>
        <Text style={{color:'#ffffff'}}>Home</Text>
      </TouchableOpacity>
  });

  constructor(props){
    super(props)
    this.state={
      userName:'',
      userEmail:'',
      userPassword:''
    }
  }
  componentWillMount() {
    axios.get('https://react-native-login-register.herokuapp.com/api/v1/user')
      .then(response => this.setState({user: response.data.user}))
  }

  userRegister = (email, password, name) =>{
    const {userName} = this.state;
    const {userEmail} = this.state;
    const {userPassword} = this.state;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (userName === "") {
      this.setState({message:'Please enter userName'})
    } else if(userEmail === "") {
      this.setState({message:'Please enter Email address'})
    } else if(reg.test(userEmail) === false) {
      this.setState({message:'Email is Not Correct'})
      return false;
    } else if(userPassword === "") {
      this.setState({message:'Please enter password'})
    }

    axios.post(`https://react-native-login-register.herokuapp.com/api/v1/user`, {
      user: {
        userName: name,
        userEmail: email,
        userPassword: password
      }
    })
      .then(response => this.setState({user: this.state.user.push(response.data.user), userEmail:'', userPassword: '', userName: ''}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{padding:10,margin:10,color:'red'}}>{this.state.message}</Text>

        <TextInput
          value={this.state.userName}
          placeholder="Enter Name"
          style={{width:250,margin:10, borderColor:"#333", borderWidth:1}}
          underlineColorAndroid="transparent"
          onChangeText= {userName => this.setState({userName})}
        />

        <TextInput
          value={this.state.userEmail}
          placeholder="Enter Email"
          style={{width:250,margin:10, borderColor:"#333", borderWidth:1}}
          underlineColorAndroid="transparent"
          onChangeText= {userEmail => this.setState({userEmail})}
        />

        <TextInput
          value={this.state.userPassword}
          placeholder="Enter Password"
          style={{width:250,margin:10, borderColor:"#333", borderWidth:1}}
          underlineColorAndroid="transparent"
          onChangeText= {userPassword => this.setState({userPassword})}
        />

        <TouchableOpacity
          onPress={this.userRegister}
          style={{width:250,padding:10, backgroundColor:'blue', alignItems:'center'}}>
          <Text style={{color:'#fff'}}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
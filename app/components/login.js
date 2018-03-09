import React, { Component } from 'react'
import axios from 'axios'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'

export default class login extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Login',
    headerRight:
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{margin: 10, backgroundColor: '#F5FCFF', padding: 10}}>
        <Text style={{color: 'black'}}>Home</Text>
      </TouchableOpacity>
  })

  constructor (props) {
    super(props)
    this.state = {
      user: [],
      userEmail: '',
      userPassword: ''
    }
    // this.saveUser = this.saveUser.bind(this)
  }

  componentWillMount () {
    axios.get('https://react-native-login-register.herokuapp.com/api/v1/user')
      .then(response => this.setState({user: response.data.user}))
  }

  login = (email, password) => {
    const {userEmail, userPassword} = this.state
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (userEmail === '') {
      this.setState({message: 'Please enter Email address'})
    } else if (reg.test(userEmail) === false) {
      this.setState({message: 'Email is Not Correct'})
      return false
    } else if (userPassword === '') {
      this.setState({message: 'Please enter password'})
    }
    axios.post('https://react-native-login-register.herokuapp.com/api/v1/user', {
      user: {
        userEmail: email,
        userPassword: password
      }
    })
      .then((response) => {
        this.setState({
          user: response.data.user,
          userEmail: '',
          userPassword: ''
        })
      })
    // .catch((error)=>{
    //   console.log(44, error)
    // })
  }

  render () {
    // alert(JSON.stringify(this.state.user))
    return (
      <View style={styles.container}>
        <Text style={{padding: 10, margin: 10, color: 'red'}}>{this.state.message}</Text>

        <TextInput
          value={this.state.userEmail}
          placeholder="Enter Email"
          style={{width: 200, margin: 10, borderColor: '#333', borderWidth: 1}}
          underlineColorAndroid="transparent"
          onChangeText={userEmail => this.setState({userEmail})}
        />

        <TextInput
          value={this.state.userPassword}
          placeholder="Enter Password"
          style={{width: 200, margin: 10, borderColor: '#333', borderWidth: 1}}
          underlineColorAndroid="transparent"
          onChangeText={userPassword => this.setState({userPassword})}

        />

        <TouchableOpacity
          onPress={this.login}
          style={{width: 200, padding: 10, backgroundColor: 'orange', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>Login</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

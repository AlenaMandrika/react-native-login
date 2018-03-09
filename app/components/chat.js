import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  FlatList} from 'react-native';

export default class home extends Component{
  static navigationOptions= ({navigation}) =>({
    title: 'Welcome',
  });
  constructor (props) {
    super(props)
    this.state = {
      messagesArray: [],
      text:''
    }
  }

  onMessageSend () {
    if(this.state.text) {
      let messages = this.state.messagesArray
      messages.push({
        'text': this.state.text
      })
      this.setState ({
        messagesArray: messages,
        text: ''
      })
    }
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <View>
        <View style={styles.container}>
          <Text style={styles.pageName}>Welcome to the public chat room!</Text>
        </View>
        <ScrollView>
          {this.state.messagesArray.map((mes, index) => {
            return (
              <View>
                <Text>{mes.text}</Text>
              </View>
            )
          })}
        </ScrollView>
        <TextInput
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}/>
        <Button style={styles.message} title='Send Message' onPress={() => this.onMessageSend()}/>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  pageName: {
    margin:20,
    fontWeight:'bold',
    color:'#000',
    textAlign:'center'
  },
  message: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

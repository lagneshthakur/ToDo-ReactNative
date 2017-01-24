import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import ListView from './ListView';

class SplashView extends Component {
  constructor(props) {
    super(props);
    this._navigate = this._navigate.bind(this);
  }
  _navigate(){
  this.props.navigator.push({
    name: 'ListView', // Matches route.name
  })
}

componentDidMount(){
  setTimeout(() => {this._navigate({timePassed: true})}, 2000)
}

  render() {
    return (
       <View style={styles.container}>
          <Text style={{color:"white", fontWeight:"bold", fontSize:42}}>Tasked</Text>          
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0084FF',
  },
  cygrp: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color:'#DB6D38',
  },
  todo: {
    color: '#0076A6',
  },
});



module.exports = SplashView;

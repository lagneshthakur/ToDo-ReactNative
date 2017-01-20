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
          <Text style={styles.cygrp}>CyGrp
            <Text style={styles.todo}> ToDo</Text>
          </Text>
         <TouchableHighlight onPress={this._navigate}>
         <Image source={require('./img/cyber-group-logo.png')}/>
        </TouchableHighlight>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
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

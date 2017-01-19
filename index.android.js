/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ListView from './src/ListView';


export default class Project_First extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.welcome}>
          Welcome to ReactNATIVE!
        </Text>
        <Text style={{paddingTop: 6, paddingBottom: 40}}>
          Awesome! We will make a to-do app now.
        </Text>
        <View style={styles.container}>
          <ListView></ListView>
        </View>
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

AppRegistry.registerComponent('Project_First', () => Project_First);

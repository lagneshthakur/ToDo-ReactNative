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
  View,
  Navigator
} from 'react-native';
import SplashView from './src/SplashView';
import ListView from './src/ListView';


export default class Project_First extends Component {
  renderScene(route, navigator) {
   if(route.name == 'SplashView') {
     return <SplashView navigator={navigator} />
   }
   if(route.name == 'ListView') {
     return <ListView navigator={navigator} />
   }
}
  render() {
    return (
      <Navigator
         style={{ flex:1 }}
         initialRoute={{ name: 'SplashView' }}
         renderScene={ this.renderScene }
         configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom} />
    );
  }
};

AppRegistry.registerComponent('Project_First', () => Project_First);

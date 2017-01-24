import React, {Component} from 'react';
import {TouchableHighlight, View, Text, TextInput, Button, Alert} from 'react-native';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onDelete = this._onDelete.bind(this);

    this.state = {
      data: this.props.data,
      newValue: ''
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data,
      newValue: ''
    })
  }

  _onPress(){
    var data = this.state.data;
    this.setState({
      data: data,
      edit: true,
      newValue: ''
    });
  }

  _onCheckBoxPressed() {
    var data = this.state.data;
    data.completed = !data.completed;
    this.setState({
      data: data
    });

    this.props.onCompletedChange(data, this.props.dataIndex);
  }

  _onSubmit(event){
    var title = event.nativeEvent.text;
    var data = this.state.data;
    data.title = title;
    this.setState({
      edit: false,
      data: data
    });
  }

  _onDelete(){
    Alert.alert( 'Confirm Delete', 'Are you sure you want to delete this ToDo?', [
      {},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () =>
        {console.log('OK Pressed');
            var data = this.state.data;
            data.isDeleted = true;
            this.setState({
              edit: false,
              data: data
            });
        }},
    ]);
  }

  render() {
    let data = this.state.data;
    let editable = this.state.edit;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    let editableItem = null, nonEditableItem = null;
    if(editable){
      editableItem =
      <View>
        <TextInput multiline={true} onSubmitEditing={this._onSubmit} style={{minWidth: 250,height: 36, padding: 4, marginBottom: 0, fontSize: 20, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}><Text>{data.title}</Text></TextInput>
        <TouchableHighlight style={styles.addButton} underlayColor='darkred' onPress={this._onDelete}>
          <Text style={{fontSize: 50, color: 'white'}}> </Text>
        </TouchableHighlight>
      </View>;
    }
    else {
      nonEditableItem = <Text style={{fontSize:20, color: color, textDecorationLine: textDecorationLine}}>{data.title}</Text>
    }
    if(this.state.data.isDeleted){
      return(<View></View>)
    }
    else {
      return (
        <TouchableHighlight onPress={this._onPress} underlayColor={'#eee'} style={styles.listViewItem} {...this.props.sortHandlers}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
            {editableItem}
            {nonEditableItem}
          </View>
        </TouchableHighlight>
      )
    }
  }
}

const styles = {
  addButton: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right:-20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  listViewItem:{
  paddingTop: 6,
  paddingBottom: 6,
  paddingRight: 30,
  backgroundColor: "#F5FCFF",
  borderBottomWidth:1,
  borderColor: '#0076A6'
  },
}

module.exports = ListViewItem;

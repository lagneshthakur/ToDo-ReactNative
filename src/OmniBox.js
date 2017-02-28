import React, { Component } from 'react';
import { TextInput } from 'react-native';
import TodoModel from './ToDoModel';
import Utils from './Utils';

class OmniBox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  onChange(event){
    var title = event.nativeEvent.text;
    var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));

    this.setState({
      newValue: title
    });
    this.props.updateDataList(dataList);
  }

  onSubmit(event){
      var newDataItem = new TodoModel(this.state.newValue);
      fetch('http://172.25.120.214:3000/todo/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: newDataItem
        })
      })  
      var dataList = this.props.data;
      var dataItem = Utils.findTodo(newDataItem, dataList);
      if(dataItem) {
        Utils.move(dataList, (dataList.indexOf(dataItem)), 0);

        this.setState({
          newValue: ''
        });
        this.props.updateDataList(dataList);
        return;
      }

      dataList.unshift(newDataItem);

      this.setState({
        newValue: ''
      });
      this.props.updateDataList(dataList);
  }

  render() {
    return (
      <TextInput style={{minWidth: 250,height: 36, padding: 6, marginTop: 10, marginBottom: 10, fontSize: 20, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff'}}
        placeholder='Add a todo or Search'
        blurOnSubmit={false}
        value={this.state.newValue}
        onSubmitEditing={this.onSubmit}
        onChange={this.onChange}>
      </TextInput>
    );
  }
}

module.exports = OmniBox;

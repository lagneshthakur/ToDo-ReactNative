import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Button} from 'react-native';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';

let dataList;
var dataListOrder;
var dataAvailable = false;

function getOrder(list) {
  return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
  constructor(props) {
    super(props);
    this.updateDataList = this.updateDataList.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this.getListItems = this.getListItems.bind(this);
    this.state = {
      dataList: null
    }
  }

  getListItems(){
  fetch('http://172.25.120.214:3000/todo/')
    .then((response) => response.json())
    .then((responseJson) => { 
      console.log("********items****** getListItems " + JSON.stringify(responseJson.items));
      dataList = responseJson.items;
      dataListOrder = getOrder(dataList);
      dataAvailable = true;
      this.setState({
        dataList: dataList,
      });
    })
    .catch((error) => { console.error(error); });
  }

  componentDidMount(){
    console.log("2");
    this.getListItems();
  }

  updateDataList(dataList) {
    
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList: dataList
    });
  }

  _onCompletedChange(dataItem, index) {
    let fromIndex = dataListOrder.indexOf(index);
    let toIndex = dataItem.completed ? dataListOrder.length - 1 : 0;
    moveOrderItem(this, fromIndex, toIndex);
  }

  _navigate(){
  this.props.navigator.pop();
  }

  render() {
    console.log("1");
    let listView = (<View></View>);
    if(!dataAvailable){
      return (
        <View style={{backgroundColor: "skyblue"}}>
          <TouchableHighlight>
          <Text style={{marginTop: 250, textAlign:"center", height: 50, fontSize: 24, color: "blue", backgroundColor:"white"}} >Loading Data..</Text>
          </TouchableHighlight>
        </View>
      )
    }
    else{
      listView = (
        <SortableListView
          ref='listView'
          style={{flex: 1, backgroundColor:"white"}}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} onCompletedChange={this._onCompletedChange}/>}
        />
      );
    return (
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
        <Text style={{fontSize: 30,backgroundColor:"#0076A6", color:"white", marginLeft: -10, marginRight: -10, padding:10}}>
          ToDo List
        </Text>
          <OmniBox
            data={dataList}
            updateDataList={this.updateDataList}
            />
          {listView}
        </View>
    )
    //   <TouchableHighlight onPress={ () => this._navigate() }>
    //      <Text>GO Back</Text>
    //  </TouchableHighlight>
    }
  }
};

module.exports = ListView;

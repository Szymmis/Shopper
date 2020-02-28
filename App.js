import React, { Component } from 'react';
import { StyleSheet, Text, View, BackHandler, Keyboard, Dimensions, StatusBar, AsyncStorage } from 'react-native';
import HomeScreen from './components/screens/HomeScreen';
import IconButton from './components/buttons/IconButton';
import GroupsScreen from './components/screens/GroupsScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import EditGroupScreen from './components/screens/EditGroupScreen';
import Popup from './components/popups/Popup'

import { Group, Item } from './components/logic/Logic';
import TaskPopup from './components/popups/TaskPopup';
import CalendarPopup from './components/popups/CalendarPopup';
import ItemPopup from './components/popups/ItemPopup';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height - StatusBar.currentHeight;

const PRODUCTION = true;

export default class App extends Component {
  constructor(props) {
    super(props);

    // AsyncStorage.removeItem("data");

    //Loading data from local storage
    (async () => {
      try {
        let data = await AsyncStorage.getItem("data");
        if (data) {
          data = JSON.parse(data);
        }
        else {
          data = {};
          (async () => {
            await AsyncStorage.setItem("data", JSON.stringify({}));
          })();
        }
        await this.setState({ data });
      } catch (e) {
        console.log(e);
      }
    })();

    this.state = {
      screen: 2,
      popupScreen: 0,
      groups: [new Group("Jedzenie", "#5569A2"), new Group("Higiena", "#53BB64"), new Group("Ciuchy", "#C273B5")],
      editedGroup: undefined,
      editedItem: undefined,
      editedTask: undefined,
      // popupHeight: Dimensions.get("window").height / 2,
      popupHeight: 260,
    }

    this.setScreen = this.setScreen.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.selectGroup = this.selectGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.select = this.select.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.saveData = this.saveData.bind(this);
    this.resetData = this.resetData.bind(this);
    this.addToDate = this.addToDate.bind(this);
    this.removeFromDate = this.removeFromDate.bind(this);
    this.findDate = this.findDate.bind(this);
  }

  saveData() {
    (async () => {
      await AsyncStorage.setItem("data", JSON.stringify(this.state.data))
    })();
  }

  resetData() {
    (async () => {
      await AsyncStorage.removeItem("data");
    })();
  }

  setScreen(screen) {
    this.setState({ screen });
  }

  async addGroup(group) {
    let data = this.state.data;
    if (data.groups)
      data.groups = [...data.groups, group]
    else
      data.groups = [group]
    await this.setState({ data })
    this.saveData();
  }

  selectGroup(group) {
    this.setState({ screen: 3, editedGroup: group })
  }

  async removeGroup(group) {
    let data = this.state.data;
    data.groups = data.groups.filter((value) => value != group)
    await this.setState({ data });
    this.saveData();
  }

  async editGroup(properties) {
    let _keys = Object.keys(properties);
    for (let i = 0; i < _keys.length; i++) {
      this.state.editedGroup[_keys[i]] = properties[_keys[i]];
    }
    await this.setState({ groups: [...this.state.groups] })
    this.saveData();
  }

  select(type, item) {
    (type) ?
      this.setState({ editedItem: item }) :
      this.setState({ editedTask: item })
  }

  async addItem(item) {
    this.state.editedGroup.items.push(item);
    await this.setState({ groups: [...this.state.groups], editedItem: item });
    this.saveData();
  }

  async removeItem(item) {
    this.state.editedGroup.items = this.state.editedGroup.items.filter((value) => { return value != item; });
    await this.setState({ groups: [...this.state.groups] });
    this.saveData();
  }

  async editItem(type, properties) {
    console.log(properties);
    let data = this.state.data;
    let _keys = Object.keys(properties);
    for (let i = 0; i < _keys.length; i++) {
      (type) ?
        this.state.editedItem[_keys[i]] = properties[_keys[i]] :
        this.state.editedTask[_keys[i]] = properties[_keys[i]]
    }
    await this.setState({ data, groups: [...this.state.groups] })
    this.saveData();
  }

  findDate(type, item) {
    console.log("1");
    let data = this.state.data;
    let keys = Object.keys(data);
    let arr = (type) ? "items" : "tasks";
    for (let i = 0; i < keys.length; i++) {
      console.log("2");
      let _key = keys[i];
      console.log(data[_key][arr]);
      if (data[_key][arr]) {
        console.log("3");
        for (let j = 0; j < data[_key][arr].length; j++) {
          if (data[_key][arr][j] == item) {
            return _key;
          }
        }
      }
    }

    return undefined;
  }

  async addToDate(type, item, date) {
    let data = this.state.data;
    if (data[date] == undefined)
      data[date] = { items: [], tasks: [] };
    let arr;
    arr = (type) ? 'items' : 'tasks';
    data[date][arr].push(item);

    await this.setState({ data });
    this.saveData();
  }

  async removeFromDate(type, item) {
    let data = this.state.data;
    let date = this.findDate(type, item);
    if (date) {
      if (data[date]) {
        let arr = (type) ? 'items' : 'tasks';
        let _array = [];
        for (let i = 0; i < data[date][arr].length; i++) {
          if (data[date][arr][i] != item)
            _array.push(data[date][arr][i]);
        }
        data[date][arr] = _array;
        await this.setState({ data });
        this.saveData();
      }
    }

    if (this.refs.popup)
      this.refs.popup.hide();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.screen == 3) { this.setScreen(1); }
      this.refs.popup.hide();

      return true;
    })

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
      (e) => { if (this.refs.popup) this.refs.popup.resize(Math.min(this.state.popupHeight + e.endCoordinates.height, Dimensions.get("window").height - 20), 100) }
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
      (e) => { if (this.refs.popup) this.refs.popup.resize(this.state.popupHeight, 100) }
    );
  }

  async showPopup(screen) {
    await this.setState({ popupScreen: screen });
    if (this.refs.popup)
      this.refs.popup.show();
  }

  render() {
    return (
      <View style={{ width: WIDTH, height: HEIGHT, top: (PRODUCTION) ? StatusBar.currentHeight : 0 }}>
        <View style={{ ...styles.container }}>
          {(this.state.screen == 0) ? <HomeScreen></HomeScreen> :
            (this.state.screen == 1) ? <GroupsScreen groups={this.state.data.groups} add={() => { this.addGroup(new Group("new group")) }} remove={this.removeGroup} select={this.selectGroup}></GroupsScreen> :
              (this.state.screen == 2) ? <CalendarScreen addToDate={this.addToDate} data={this.state.data} select={this.select} showPopup={this.showPopup}></CalendarScreen> :
                (this.state.screen == 3) ? <EditGroupScreen group={this.state.editedGroup} item={this.state.editedItem} add={() => { this.addItem(new Item("Przedmiot", 0)); }} select={this.selectItem} editGroup={this.editGroup} editItem={this.editItem} remove={this.removeItem}></EditGroupScreen> : null
          }
        </View>
        <View style={styles.navigationBar}>
          <IconButton style={{ flex: 1 }} onClick={() => { this.setScreen(2) }} name={"calendar"} size={32} color={(this.state.screen == 2) ? "#FFB300" : ""}></IconButton>
          <IconButton style={{ flex: 1 }} onClick={() => { this.setScreen(0) }} name={"home"} size={40} color={(this.state.screen == 0) ? "#FFB300" : ""}></IconButton>
          <IconButton style={{ flex: 1 }} onClick={() => { this.setScreen(1) }} name={"shopping-cart"} size={36} color={(this.state.screen == 1) ? "#FFB300" : ""}></IconButton>
        </View>
        {/* <View style={{position: "absolute", elevation: 5, width: "100%", height: "100%", backgroundColor: "#000", opacity: 0.5}} pointerEvents={"none"}></View> */}
        <Popup ref="popup" opacity={0.6} speed={300} height={this.state.popupHeight}
          content={
            (this.state.popupScreen) ?
              <ItemPopup selected={this.state.editedItem} edit={this.editItem} remove={this.removeFromDate}></ItemPopup> :
              <TaskPopup selected={this.state.editedTask} edit={this.editItem} remove={this.removeFromDate}></TaskPopup>
            // <CalendarPopup onSelect={() => { this.refs.popup.hide() }}></CalendarPopup>
          }>
        </Popup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 20,
    backgroundColor: "#fff",
  },
  navigationBar: {
    backgroundColor: "#f6f6f6",
    borderTopColor: "#f0f0f0",
    borderTopWidth: 3,
    alignSelf: "flex-end",
    height: 60,
    flexDirection: "row",
  }
});

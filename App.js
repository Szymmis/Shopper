import React, { Component } from 'react';
import { StyleSheet, Text, View, BackHandler, Keyboard, Dimensions, AsyncStorage } from 'react-native';
import HomeScreen from './components/screens/HomeScreen';
import IconButton from './components/buttons/IconButton';
import GroupsScreen from './components/screens/GroupsScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import EditGroupScreen from './components/screens/EditGroupScreen';
import Popup from './components/popups/Popup'

import { Group, Item } from './components/logic/Logic';
import TaskPopup from './components/popups/TaskPopup';
import CalendarPopup from './components/popups/CalendarPopup';

export default class App extends Component {
  constructor(props) {
    super(props);

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
      groups: [new Group("Jedzenie", "#5569A2"), new Group("Higiena", "#53BB64"), new Group("Ciuchy", "#C273B5")],
      editedGroup: undefined,
      editedItem: undefined,
      popupHeight: Dimensions.get("window").height / 2,
    }

    this.setScreen = this.setScreen.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.selectGroup = this.selectGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.saveData = this.saveData.bind(this);
    this.resetData = this.resetData.bind(this);
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

  selectItem(item) {
    this.setState({ editedItem: (item != this.state.editedItem) ? item : undefined })
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

  async editItem(properties) {
    let _keys = Object.keys(properties);
    for (let i = 0; i < _keys.length; i++) {
      this.state.editedItem[_keys[i]] = properties[_keys[i]];
    }
    await this.setState({ groups: [...this.state.groups] })
    this.saveData();
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

  showPopup() {
    if (this.refs.popup)
      this.refs.popup.show();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {(this.state.screen == 0) ? <HomeScreen></HomeScreen> :
            (this.state.screen == 1) ? <GroupsScreen groups={this.state.data.groups} add={() => { this.addGroup(new Group("new group")) }} remove={this.removeGroup} select={this.selectGroup}></GroupsScreen> :
              (this.state.screen == 2) ? <CalendarScreen showPopup={this.showPopup}></CalendarScreen> :
                (this.state.screen == 3) ? <EditGroupScreen group={this.state.editedGroup} item={this.state.editedItem} add={() => { this.addItem(new Item("Przedmiot", 0)); }} select={this.selectItem} editGroup={this.editGroup} editItem={this.editItem} remove={this.removeItem}></EditGroupScreen> : null
          }
        </View>
        <View style={styles.navigationBar}>
          <IconButton style={{ flex: 1 }} onClick={() => { this.setScreen(2) }} name={"calendar"} color={(this.state.screen == 2) ? "#FFB300" : ""}></IconButton>
          <IconButton style={{ flex: 1 }} onClick={() => { this.setScreen(0) }} name={"home"} size={50} color={(this.state.screen == 0) ? "#FFB300" : ""}></IconButton>
          <IconButton style={{ flex: 1 }} onClick={() => { this.setScreen(1) }} name={"shopping-cart"} size={46} color={(this.state.screen == 1) ? "#FFB300" : ""}></IconButton>
        </View>
        {/* <View style={{position: "absolute", elevation: 5, width: "100%", height: "100%", backgroundColor: "#000", opacity: 0.5}} pointerEvents={"none"}></View> */}
        <Popup ref="popup" opacity={0.6} speed={750} height={this.state.popupHeight}
          content={
            <TaskPopup></TaskPopup>
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
    marginTop: 24,
  },
  navigationBar: {
    alignSelf: "flex-end",
    height: 80,
    flexDirection: "row",
  }
});

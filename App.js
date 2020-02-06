import React, { Component } from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import HomeScreen from './components/screens/HomeScreen';
import IconButton from './components/buttons/IconButton';
import GroupsScreen from './components/screens/GroupsScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import EditGroupScreen from './components/screens/EditGroupScreen';

import Group from './components/logic/Group';
import Item from './components/logic/Item';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 2,
      groups: [new Group("Jedzenie", "#5569A2"), new Group("Higiena", "#53BB64"), new Group("Ciuchy", "#C273B5")],
      editedGroup: undefined,
      editedItem: undefined,
    }

    this.setScreen = this.setScreen.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.selectGroup = this.selectGroup.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  setScreen(screen) {
    this.setState({ screen });
  }

  addGroup(group) {
    this.setState({ groups: [...this.state.groups, group] })
  }

  selectGroup(group) {
    this.setState({ screen: 3, editedGroup: group })
  }

  editGroup(properties) {
    let _keys = Object.keys(properties);
    for (let i = 0; i < _keys.length; i++) {
      this.state.editedGroup[_keys[i]] = properties[_keys[i]];
    }
    this.setState({ groups: [...this.state.groups] })
  }

  selectItem(item) {
    this.setState({ editedItem: (item != this.state.editedItem) ? item : undefined })
  }

  addItem(item) {
    this.state.editedGroup.items.push(item);
    this.setState({ groups: [...this.state.groups], editedItem: item });
  }

  removeItem(item) {
    this.state.editedGroup.items = this.state.editedGroup.items.filter((value) => { return value != item; });
    this.setState({ groups: [...this.state.groups] });
  }

  editItem(properties) {
    let _keys = Object.keys(properties);
    for (let i = 0; i < _keys.length; i++) {
      this.state.editedItem[_keys[i]] = properties[_keys[i]];
    }
    this.setState({ groups: [...this.state.groups] })
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => { if (this.state.screen == 3) { this.setScreen(1); } return true; })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {(this.state.screen == 0) ? <HomeScreen></HomeScreen> :
            (this.state.screen == 1) ? <GroupsScreen groups={this.state.groups} add={() => { this.addGroup(new Group("new group")) }} select={this.selectGroup}></GroupsScreen> :
              (this.state.screen == 2) ? <CalendarScreen></CalendarScreen> :
                (this.state.screen == 3) ? <EditGroupScreen group={this.state.editedGroup} item={this.state.editedItem} add={() => { this.addItem(new Item("Przedmiot", this.state.editedGroup, 0)); }} select={this.selectItem} editGroup={this.editGroup} editItem={this.editItem} remove={this.removeItem}></EditGroupScreen> : null
          }
        </View>
        <View style={styles.navigationBar}>
          <IconButton onClick={() => { this.setScreen(2) }} name={"calendar"} color={(this.state.screen == 2) ? "#FFB300" : ""}></IconButton>
          <IconButton onClick={() => { this.setScreen(0) }} name={"home"} size={50} color={(this.state.screen == 0) ? "#FFB300" : ""}></IconButton>
          <IconButton onClick={() => { this.setScreen(1) }} name={"shopping-cart"} size={46} color={(this.state.screen == 1) ? "#FFB300" : ""}></IconButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 25,
    marginTop: 24,
  },
  navigationBar: {
    alignSelf: "flex-end",
    height: 80,
    flexDirection: "row",
  }
});

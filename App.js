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
      screen: 3,
      groups: [new Group("Jedzenie", "#6F89D1", "#5569A2"), new Group("Higiena", "#5BE171", "#53BB64"), new Group("Ciuchy", "#FF7EEA", "#C273B5")],
      editedGroup: undefined,
      editedItem: undefined,
    }

    this.setScreen = this.setScreen.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  setScreen(screen) {
    this.setState({ screen });
  }

  addGroup(group) {
    this.setState({ groups: [...this.state.groups, group] })
  }

  editGroup(group) {
    this.setState({ screen: 3, editedGroup: group })
  }

  editItem(item) {

    this.setState({ editedItem: (item != this.state.editedItem) ? item : undefined })
  }

  addItem(item) {
    this.state.editedGroup.items.push(item);
    this.setState({ groups: [...this.state.groups] });
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => { if (this.state.screen == 3) { this.setScreen(1); } return true; })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {(this.state.screen == 0) ? <HomeScreen></HomeScreen> :
            (this.state.screen == 1) ? <GroupsScreen groups={this.state.groups} add={() => { this.addGroup(new Group("new group")) }} edit={this.editGroup}></GroupsScreen> :
              (this.state.screen == 2) ? <CalendarScreen></CalendarScreen> :
                (this.state.screen == 3) ? <EditGroupScreen group={this.state.editedGroup} item={this.state.editedItem} add={() => { this.addItem(new Item("new item", this.state.editedGroup, Math.floor(Math.random() * 100))); }} edit={this.editItem}></EditGroupScreen> : null
          }
        </View>
        <View style={styles.navigationBar}>
          {/* <IconButton onClick={() => { this.setScreen(2) }} name={"calendar"} color={(this.state.screen == 2) ? "#FFB300" : ""}></IconButton> */}
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

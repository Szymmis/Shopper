import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import IconButton from '../buttons/IconButton';
import Calendar from '../Calendar';
import TaskListItem from '../list-items/TaskListItem'
import HomescreenListItem from '../list-items/HomescreenListItem'
import Item from '../logic/Item'
import Group from '../logic/Group'

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: 1,
      screen: 0,
      selectedDay: 4
    };

    this.selectDay = this.selectDay.bind(this);
  }

  selectDay(day) {
    this.setState({ selectedDay: day });
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar currentMonth={this.state.currentMonth}
          previous={() => { this.setState({ currentMonth: (this.state.currentMonth + 11) % 12 }) }}
          next={() => { this.setState({ currentMonth: (this.state.currentMonth + 1) % 12 }) }}
          select={this.selectDay}
          selectedDay={this.state.selectedDay}></Calendar>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <IconButton name={"list"} size={28} color={this.state.screen ? "" : "orange"} onClick={() => { this.setState({ screen: 0 }) }}></IconButton>
          <IconButton style={{ marginTop: -6 }} color={!this.state.screen ? "" : "orange"} name={"shopping-cart"} size={32} onClick={() => { this.setState({ screen: 1 }) }}></IconButton>
        </View>
        {(this.state.selectedDay >= 0) ?
          (this.state.screen) ?
            <View style={{ ...styles.toBuyList, flex: 1 }}>
              <Text style={{ ...styles.textSmall }}>zakupy zaplanowane na </Text>
              <ScrollView style={{ ...styles.itemList }}>
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                  <HomescreenListItem item={new Item("Humus", new Group("mniam"), 23)}></HomescreenListItem>
                  <HomescreenListItem item={new Item("Czarna sukienka", new Group("ubrania"), 23)}></HomescreenListItem>
                  <HomescreenListItem item={new Item("lalka", new Group("mniam"), 23)}></HomescreenListItem>
                </View>
              </ScrollView>
            </View>
            :
            <View style={{ ...styles.toBuyList, flex: 1 }}>
              <Text style={{ ...styles.textSmall, marginBottom: 4 }}>{(this.state.selectedDay) ? "zadania na " + (this.state.selectedDay + 1) + "." + (this.state.currentMonth + 1) : ""}</Text>
              <ScrollView style={{ ...styles.itemList }}>
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                  <TaskListItem item={new Item("Odebrać dzieci z przedszkola", new Group(""), 0)}></TaskListItem>
                  <TaskListItem item={new Item("Skosić trawę", new Group(""), 0)}></TaskListItem>
                  <TaskListItem item={new Item("Posprzątać poddasze", new Group(""), 0)} done={true}></TaskListItem>
                  <TaskListItem item={new Item("Skosić trawę", new Group(""), 0)}></TaskListItem>
                </View>
              </ScrollView>
            </View>
          : null}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  textSmall: {
    fontSize: 12,
    color: "#A8A8A8",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  toBuyList: {
    marginTop: 5
  },
});

export default CalendarScreen;

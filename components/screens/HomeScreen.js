import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HomescreenListItem from '../list-items/HomescreenListItem';
import TaskListItem from '../list-items/TaskListItem';
import { Group, Item } from '../logic/Logic';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.texts, fontSize: 24, marginBottom: 15, fontStyle: "italic", alignSelf: "flex-end", color: "#777" }}>poniedziałek, 21.03</Text>
        {/* <View style={{ marginTop: 18, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...styles.textSmall }}>poniedziałek, 03.02</Text>
          <Text style={{ ...styles.textSmall }}>rozkład priorytetów</Text>
        </View> */}
        {/* <View style={styles.prioritiesBar}>
          <View style={{ width: "60%", height: 16, backgroundColor: "#FE5454", borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}></View>
          <View style={{ width: "20%", height: 16, backgroundColor: "#f1cc39" }}></View>
          <View style={{ width: "20%", height: 16, backgroundColor: "#1ab34d", borderTopRightRadius: 8, borderBottomRightRadius: 8 }}></View>
        </View> */}
        <View style={{ ...styles.toBuyList, flex: 1 }}>
          <Text style={{ ...styles.textSmall }}>zadania na dzisiaj</Text>
          <ScrollView style={{ ...styles.itemList }}>
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
              <TaskListItem item={new Item("Odebrać dzieci z przedszkola", new Group(""), 0)}></TaskListItem>
              <TaskListItem item={new Item("Skosić trawę", new Group(""), 0)}></TaskListItem>
              <TaskListItem item={new Item("Posprzątać poddasze", new Group(""), 0)} done={true}></TaskListItem>
              <TaskListItem item={new Item("Zapłacić czynsz", new Group(""), 0)}></TaskListItem>
            </View>
          </ScrollView>
        </View>
        {/* <View style={styles.costSection}>
          <View>
            <Text style={{ ...styles.textSmall, alignSelf: "flex-start" }}>dostępne środki</Text>
            <Text style={{ ...styles.textBig }}>884,32zł</Text>
          </View>
          <View>
            <Text style={{ ...styles.textSmall }}>wydane pieniądze</Text>
            <Text style={{ ...styles.textBig }}>334,70zł</Text>
          </View>
        </View> */}
        {/* <View style={{ ...styles.toBuyList, flex: 1 }}>
          <Text style={{ ...styles.textSmall }}>zakupy zaplanowane na dzisiaj</Text>
          <ScrollView style={{ ...styles.itemList }}>
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
              <HomescreenListItem item={new Item("Humus", new Group("mniam"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("Czarna sukienka", new Group("ubrania"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("lalka", new Group("mniam"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("Czarna sukienka", new Group("ubrania"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("lalka", new Group("mniam"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("Czarna sukienka", new Group("ubrania"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("lalka", new Group("mniam"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("Czarna sukienka", new Group("ubrania"), 23)}></HomescreenListItem>
              <HomescreenListItem item={new Item("lalka", new Group("mniam"), 23)}></HomescreenListItem>
            </View>
          </ScrollView>
          <View style={{ paddingRight: 10, height: 50, marginTop: 10 }}>
            <Text style={{ ...styles.textSmall }}>suma</Text>
            <Text style={{ ...styles.text }}>334,70zł</Text>
          </View>
        </View> */}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  text: {
    alignSelf: "flex-end",
    fontSize: 20,
    fontStyle: "italic",
    color: "#464646"
  },
  textSmall: {
    fontSize: 12,
    color: "#A8A8A8",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  textBig: {
    fontSize: 22,
    fontStyle: "italic",
    alignSelf: "flex-end",
    color: "#454545"
  },
  prioritiesBar: {
    flexDirection: "row",
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
  },
  costSection: {
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  toBuyList: {
  },
  itemList: {
    marginTop: 5,
  }
});

export default HomeScreen;

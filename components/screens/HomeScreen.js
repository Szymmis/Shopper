import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HomescreenListItem from '../list-items/HomescreenListItem';
import TaskListItem from '../list-items/TaskListItem';
import { Task, Group, Item } from '../logic/Logic';
import IconButton from '../buttons/IconButton';
import AddButton from '../buttons/AddButton';

const DAYS = ['Poniedziałek', "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  formatDate(date) {
    let _ = date.split("_");
    return `${_[0]}.${(_[1].length == 1) ? '0' + (parseInt(_[1]) + 1) : parseInt(_[1]) + 1}`;
  }

  render() {
    let d = new Date();
    let date = d.getDate() + "_" + d.getMonth() + "_" + d.getFullYear();

    return (
      <View style={styles.container}>
        <Text style={{ ...styles.texts, fontSize: 24, marginBottom: 15, fontStyle: "italic", alignSelf: "flex-end", color: "#777" }}>{DAYS[d.getDay() - 1].toLowerCase()}, {this.formatDate(date)}</Text>
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
          <View style={{ marginTop: 10, marginBottom: 8, flexDirection: "row" }}>
            <IconButton style={{ flex: 1 }} name={"list"} size={28} color={this.state.screen ? "" : "orange"} onClick={() => { this.setState({ screen: 0 }) }}></IconButton>
            <IconButton style={{ flex: 1, marginTop: -6 }} color={!this.state.screen ? "" : "orange"} name={"shopping-cart"} size={32} onClick={() => { this.setState({ screen: 1 }) }}></IconButton>
          </View>
          {(this.state.screen) ?
            <View>
              <Text style={{ ...styles.textSmall, marginRight: 10 }}>zakupy na dzisiaj</Text>
              <ScrollView style={{ ...styles.itemList }}>
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                  {(this.props.data && this.props.data[date] && this.props.data[date].items) ? this.props.data[date].items.map((e, i) => {
                    return <HomescreenListItem item={e} key={i} onPress={async () => { await this.props.select(1, e); this.props.showPopup(1); }}></HomescreenListItem>
                  }) : null}
                  <AddButton text="dodaj przedmiot" onClick={() => {
                    let item = new Item(`przedmiot ${Math.floor(Math.random() * 20)} `, "12.99");
                    this.props.addToDate(1, item, date);
                    this.props.select(1, item);
                    this.props.showPopup(1);
                  }}></AddButton>
                </View>
              </ScrollView>
            </View> :
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.textSmall, alignSelf: "flex-start", marginLeft: 10 }}>zadania na dzisiaj</Text>
              <ScrollView style={{ ...styles.itemList }}>
                <View style={{ marginHorizontal: 10, marginVertical: 5, paddingBottom: 0 }}>
                  {(this.props.data && this.props.data[date] && this.props.data[date].tasks) ? this.props.data[date].tasks.map((e, i) => {
                    return <TaskListItem item={e} key={i} onPress={async () => { await this.props.select(0, e); this.props.showPopup(0); }}></TaskListItem>
                  }) : null}
                  <AddButton text="dodaj zadanie" onClick={async () => {
                    let task = new Task(`zadanie ${Math.floor(Math.random() * 100)}`);
                    this.props.addToDate(0, task, date);
                    this.props.select(0, task);
                    this.props.showPopup(0);
                  }}></AddButton>
                </View>
              </ScrollView>
            </View>
          }
        </View>
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

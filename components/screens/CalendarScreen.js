import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import IconButton from '../buttons/IconButton';
import Calendar from '../Calendar';
import TaskListItem from '../list-items/TaskListItem'
import HomescreenListItem from '../list-items/HomescreenListItem'
import { Group, Item, Task } from '../logic/Logic'
import AddButton from '../buttons/AddButton';

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 0,
    };

    this.selectDay = this.selectDay.bind(this);

  }

  componentDidMount = () => {
    let _date = new Date();
    this.selectDay(_date.getDate() + "_" + _date.getMonth() + "_" + _date.getFullYear());
  };


  selectDay(day) {
    this.setState({ date: day, selectedDay: parseInt(day.split("_")[0]) });
  }

  formatDate(date) {
    let _ = date.split("_");
    return `${_[0]}.${(_[1].length == 1) ? '0' + (parseInt(_[1]) + 1) : parseInt(_[1]) + 1}`;
  }

  scrollToBottom(type, h) {
    if (this.state.scrollable) {
      (type) ? this.refs.itemsScrollView.scrollTo({ 'y': h }) : this.refs.tasksScrollView.scrollTo({ 'y': h });
      this.setState({ scrollable: false });
    }
  }

  getFormated() {
    let formated = {};

    if (this.props.data) {
      Object.keys(this.props.data).forEach((e, i) => {
        if (e.includes('_')) {
          let items = [...this.props.data[e].tasks, ...this.props.data[e].items];
          if (items.length > 0) {
            let color = "#1ab34d";
            for (let i = 0; i < items.length; i++) {
              if (items[i].priority == 0) {
                color = "#FE5454";
                break;
              }
              else if (items[i].priority == 1) color = "#f1cc39";
            }
            formated[e] = color;
          }
        }
      })
    }

    return formated;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.textSmall }}>wybierz datę </Text>
        <Calendar onSelect={this.selectDay} format={this.getFormated()}></Calendar>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <IconButton style={{ flex: 1 }} name={"list"} size={28} color={this.state.screen ? "" : "orange"} onClick={() => { this.setState({ screen: 0 }) }}></IconButton>
          <IconButton style={{ flex: 1, marginTop: -6 }} color={!this.state.screen ? "" : "orange"} name={"shopping-cart"} size={32} onClick={() => { this.setState({ screen: 1 }) }}></IconButton>
        </View>
        {(this.state.selectedDay >= 0 && this.state.date) ?
          (this.state.screen) ?
            <View style={{ ...styles.toBuyList, flex: 1 }}>
              <Text style={{ ...styles.textSmall, marginRight: 10, marginBottom: 4 }}>zakupy zaplanowane na {this.formatDate(this.state.date)}</Text>
              <ScrollView ref="itemsScrollView" onContentSizeChange={(w, h) => { this.scrollToBottom(1, h) }}>
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                  {(this.props.data && this.state.date && this.props.data[this.state.date] && this.props.data[this.state.date].items) ?
                    this.props.data[this.state.date].items.map((e, i) => <HomescreenListItem onPress={async () => { await this.props.select(1, e); this.props.showPopup(1); }} item={e} key={i}></HomescreenListItem>)
                    : null}
                  <AddButton text="dodaj przedmiot" onClick={(this.props.addToDate) ? () => {
                    let item = new Item(`przedmiot ${Math.floor(Math.random() * 20)} `, "12.99");
                    this.setState({ scrollable: true });
                    this.props.addToDate(1, item, this.state.date);
                    this.props.select(1, item);
                    this.props.showPopup(1);
                  } : {}}></AddButton>
                </View>
              </ScrollView>
            </View>
            :
            <View style={{ ...styles.toBuyList, flex: 1 }}>
              <Text style={{ ...styles.textSmall, alignSelf: "flex-start", marginLeft: 10, marginBottom: 4 }}>{(this.state.selectedDay && this.state.date) ? "zadania zaplanowane na " + this.formatDate(this.state.date) : ""}</Text>
              <ScrollView ref="tasksScrollView" onContentSizeChange={(w, h) => { this.scrollToBottom(0, h) }}>
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                  {(this.props.data && this.state.date && this.props.data[this.state.date] && this.props.data[this.state.date].tasks) ?
                    this.props.data[this.state.date].tasks.map((e, i) => <TaskListItem onPress={async () => { await this.props.select(0, e); this.props.showPopup(0); }} onLongPress={async () => { await this.props.select(0, e); this.props.edit(0, { 'done': !e.done }); }} item={e} key={i}></TaskListItem>)
                    : null}
                  <AddButton text="dodaj zadanie" onClick={(this.props.addToDate) ? async () => {
                    let task = new Task(`zadanie ${Math.floor(Math.random() * 100)}`);
                    this.setState({ scrollable: true });
                    this.props.addToDate(0, task, this.state.date);
                    this.props.select(0, task);
                    this.props.showPopup(0);
                  } : {}}></AddButton>
                </View>
              </ScrollView>
            </View>
          : null
        }
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

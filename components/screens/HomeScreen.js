import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TaskListItem from '../list-items/TaskListItem';
import { Task } from '../logic/Logic';
import IconButton from '../buttons/IconButton';
import AddButton from '../buttons/AddButton';

const DAYS = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
const MONTHS = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Września", "Października", "Listopada", "Grudnia"]

function numberOfDays(month) {
  let _year = new Date().getFullYear();
  if (month == 1) {
    return (_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0 ? 29 : 28;
  }
  return (Math.floor(month / 6) ? (month % 2 == 1 ? 31 : 30) : (month % 2 == 0 ? 31 : 30));
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    let _date = new Date();
    this.selectDay(_date.getDate() + "_" + _date.getMonth() + "_" + _date.getFullYear());
  };

  selectDay(day) {
    this.setState({ date: day, selectedDay: parseInt(day.split("_")[0]) });
  }

  previousDay() {
    let _split = this.state.date.split("_");
    let day = parseInt(_split[0]) - 1;
    let month = parseInt(_split[1]);
    let year = parseInt(_split[2]);
    if (day < 1) {
      month = parseInt(_split[1]) - 1;
      if (month < 0) {
        month = 11;
        year--;
      }
      day = numberOfDays(month);
    }

    this.selectDay(`${day}_${month}_${year}`);
  }

  nextDay() {
    let _split = this.state.date.split("_");
    let day = parseInt(_split[0]) + 1;
    let month = parseInt(_split[1]);
    let year = parseInt(_split[2]);
    if (day > numberOfDays(month)) {
      day = 1;
      month = parseInt(_split[1]) + 1;
      if (month > 11) {
        month = 0;
        year++;
      }
    }

    this.selectDay(`${day}_${month}_${year}`);
  }

  formatDate() {
    if (this.state.date) {
      let _ = this.state.date.split("_");
      return `${_[0]} ${MONTHS[parseInt(_[1])].toLowerCase()}${(new Date().getFullYear() != parseInt(_[2])) ? ' ' + _[2] : ''}`;
      // return `${_[0]}.${(parseInt(_[1]) < 9) ? '0' + (parseInt(_[1]) + 1) : parseInt(_[1]) + 1}.${_[2]}`;
    }
    return '';
  }

  getDayOfTheWeek() {
    if (this.state.date) {
      let _split = this.state.date.split("_");
      let day = _split[0];
      let month = _split[1];
      let year = _split[2];
      let _date = new Date(year, month, day);
      return _date.getDay();
    }
  }

  render() {
    let d = new Date();
    let date = d.getDate() + "_" + d.getMonth() + "_" + d.getFullYear();

    console.log(this.state.date);

    return (
      <View style={styles.container}>
        {this.state.date ? <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <IconButton name="cog" size={34}></IconButton>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10, flex: 1 }}>
            <Text style={{ fontSize: 20, fontStyle: "italic", alignSelf: "center", color: "#777", marginBottom: -6 }}>{this.formatDate()}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 18, }}>
              <IconButton name="chevron-left" size={20} color={"#555"} style={{ marginTop: 6, padding: 10 }} onClick={() => { this.previousDay() }}></IconButton>
              <Text style={{ flex: 1, textAlign: "center", fontSize: 28, fontStyle: "italic", alignSelf: "center", color: "#555" }}>{DAYS[this.getDayOfTheWeek()]}</Text>
              <IconButton name="chevron-right" size={20} color={"#555"} style={{ marginTop: 6, padding: 10, }} onClick={() => { this.nextDay() }}></IconButton>
            </View>
          </View>
          <IconButton name="calendar" onClick={() => { this.props.showPopup(1) }} size={30} style={{ marginTop: 0 }}></IconButton>
        </View> : null}
        {this.state.date ? <View style={{ ...styles.toBuyList, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.textSmall, marginLeft: 10 }}>zadania na dzisiaj</Text>
            <ScrollView style={{ ...styles.itemList }}>
              <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                {(this.props.data && this.props.data[this.state.date] && this.props.data[this.state.date].tasks) ? this.props.data[this.state.date].tasks.map((e, i) => {
                  return (e.name.trim() != "") ? <TaskListItem item={e} key={i} onPress={async () => { await this.props.select(0, e); this.props.showPopup(0); }}></TaskListItem> : null
                }) : null}
                <AddButton text="dodaj nowe zadanie" onClick={async () => {
                  let task = new Task(`zadanie ${Math.floor(Math.random() * 100)}`);
                  this.props.addToDate(0, task, this.state.date);
                  this.props.select(0, task);
                  this.props.showPopup(0);
                }}></AddButton>
              </View>
            </ScrollView>
          </View>
        </View> : null}
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

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../buttons/IconButton';

function numberOfDays(month) {
  let _year = new Date().getFullYear();
  return (month % 2 == 0) ? 31 : ((month == 1) ? (((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0) ? 29 : 28) : 30);
}

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let _date = new Date();
    let _offset = new Date(_date.getUTCFullYear(), _date.getUTCMonth(), 1).getDay() - 1;
    let number_of_weeks = Math.ceil((numberOfDays(_date.getUTCMonth()) + _offset - 1) / 7);
    let toRender = [];
    for (let i = 0; i < number_of_weeks; i++) {
      let dayElements = [];
      for (let j = i * 7 - _offset; j < i * 7 - _offset + 7; j++) {
        dayElements.push(<View key={j} style={styles.day}><Text>{(j >= 0 && j < numberOfDays(_date.getUTCMonth())) ? j + 1 : ''}</Text></View>)
      }

      toRender.push(<View key={i} style={styles.week}>{dayElements}</View>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <IconButton size={24} name={"chevron-left"}></IconButton>
          <Text style={styles.textMonth}>Luty</Text>
          <IconButton size={24} name={"chevron-right"}></IconButton>
        </View>
        <View style={styles.calendar}>
          {toRender}
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  toolbar: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  textMonth: {
    fontSize: 20
  },
  calendar: {
    justifyContent: "center",
    alignItems: "center"
  },
  day: {
    width: 32,
    height: 32,
    backgroundColor: 'pink',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  week: {
    flexDirection: "row",
    backgroundColor: "green",
    marginVertical: 5,
  }
});

export default CalendarScreen;

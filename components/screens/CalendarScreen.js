import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Dupa</Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
});

export default CalendarScreen;

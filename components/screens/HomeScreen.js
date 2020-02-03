import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HomescreenListItem from '../list-items/HomescreenListItem';
import Item from '../logic/Item';
import Group from '../logic/Group';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Witaj, Ania</Text>
        <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...styles.textSmall }}>poniedziałek, 03.02</Text>
          <Text style={{ ...styles.textSmall }}>rozkład priorytetów</Text>
        </View>
        <View style={styles.prioritiesBar}>
          <View style={{ width: "60%", height: 10, backgroundColor: "#FE5454" }}></View>
          <View style={{ width: "20%", height: 10, backgroundColor: "#F1CC39" }}></View>
          <View style={{ width: "20%", height: 10, backgroundColor: "#37E270" }}></View>
        </View>
        <View style={styles.costSection}>
          <Text style={{ ...styles.textSmall }}>całkowity koszt</Text>
          <Text style={{ ...styles.textBig }}>334,70zł</Text>
          <Text style={{ ...styles.textSmall, color: "#FE5454" }}>42,59zł</Text>
          <Text style={{ ...styles.textSmall, color: "#F1CC39" }}>192,12zł</Text>
          <Text style={{ ...styles.textSmall, color: "#37E270" }}>99,99zł</Text>
        </View>
        <View style={{ ...styles.toBuyList }}>
          <Text style={{ ...styles.textSmall }}>zakupy zaplanowane na dzisiaj</Text>
          <ScrollView style={{ ...styles.itemList }}>
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
              <HomescreenListItem item={new Item("Kiełbasa Krakowska", new Group("dupa"), 23)}></HomescreenListItem>
            </View>
          </ScrollView>
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
    fontSize: 32,
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  prioritiesBar: {
    flexDirection: "row",
    backgroundColor: "#000",
    marginTop: 5,
    elevation: 3
  },
  costSection: {
    marginTop: 10
  },
  toBuyList: {
    marginTop: 10,
    flex: 1,
  },
  itemList: {
    marginTop: 5,
  }
});

export default HomeScreen;

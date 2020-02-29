import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Group } from 'react-native';
import GroupsListItem from '../list-items/GroupsListItem';
import AddGroupButton from '../buttons/AddGroupButton';

class GroupsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    // <GroupsListItem name="Jedzenie" color={"#6F89D1"} header={"#5569A2"}></GroupsListItem>
    //           <GroupsListItem name="Higiena" color={"#5BE171"} header={"#53BB64"}></GroupsListItem>
    //           <GroupsListItem name="Ciuchy" color={"#FF7EEA"} header={"#C273B5"}></GroupsListItem>
    let toRender;
    if (this.props.groups) {
      toRender = this.props.groups.map((e, i) => {
        return <GroupsListItem key={i} select={() => { this.props.select(e) }} remove={this.props.remove} group={e}></GroupsListItem>
      });
    }

    return (
      <View style={styles.container}>
        <View style={{ ...styles.groupsList }}>
          <Text style={{ ...styles.textSmall }}>zapisane kategorie</Text>
          <ScrollView style={{ marginTop: 10 }}>
            <View style={{ paddingBottom: 26 }}>
              {toRender}
              <AddGroupButton onClick={() => { this.props.add(); }}></AddGroupButton>
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
  textSmall: {
    fontSize: 12,
    color: "#A8A8A8",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  groupsList: {

  }
});

export default GroupsScreen;

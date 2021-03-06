import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Group, TextInput, KeyboardAvoidingView } from 'react-native';
import { Task } from '../logic/Logic';
import ColourButton from '../buttons/ColourButton';
import AddButton from '../buttons/AddButton';
import IconButton from '../buttons/IconButton';
import DeleteButton from '../buttons/DeleteButton';
import TaskListItem from '../list-items/TaskListItem';

class EditGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // <ShoppingListItem name={"Kiełbasa Krakowska"} group={"Jedzenie"} priority={0} price={23.13} date={"23.01"}></ShoppingListItem>
  // <ShoppingListItem name={"Mleko"} group={"Jedzenie"} priority={2} price={12.54}></ShoppingListItem>

  render() {
    return (
      <View style={styles.container}>
        {(this.props.group) ?
          <View style={{ flex: 1 }}>
            {/* <View style={{ flexDirection: "row" }}>
              <IconButton style={{ flex: 0, marginRight: 12 }} name="trash"></IconButton>
            </View> */}
            <View style={{}}>
              < Text style={{ ...styles.textSmall }}>nazwa kategorii</Text>
              <View style={{ ...styles.header, backgroundColor: (this.props.group.color) ? this.props.group.color : "#000" }}></View>
              <TextInput style={styles.headerInput} placeholder="dotknij by wprowadzić" onChange={(e) => { this.props.editGroup({ "name": e.nativeEvent.text }) }} value={this.props.group.name} ></TextInput>
            </View>
            <View>
              < Text style={{ ...styles.textSmall, marginTop: 10 }}>kolor</Text>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <ColourButton color="#FE5454" onClick={() => { this.props.editGroup({ "color": "#FE5454" }) }}></ColourButton>
                <ColourButton color="#F1CC39" onClick={() => { this.props.editGroup({ "color": "#F1CC39" }) }}></ColourButton>
                <ColourButton color="#6F89D1" onClick={() => { this.props.editGroup({ "color": "#6F89D1" }) }}></ColourButton>
                <ColourButton color="#37E270" onClick={() => { this.props.editGroup({ "color": "#37E270" }) }}></ColourButton>
                <ColourButton color="pink" onClick={() => { this.props.editGroup({ "color": "pink" }) }}></ColourButton>
                <ColourButton color="purple" onClick={() => { this.props.editGroup({ "color": "purple" }) }}></ColourButton>
                {/* <IconButton name="edit"></IconButton> */}
              </View>
            </View>
            <View style={{ marginTop: 8, flex: 1 }}>
              < Text style={{ ...styles.textSmall, marginTop: 5 }}>zadania w kategorii</Text>
              <ScrollView style={{}}>
                <View style={{ margin: 10 }}>
                  {(this.props.group.items) ?
                    this.props.group.items.map((e, i) => {
                      return <TaskListItem key={i} item={e} onPress={() => { if (this.props.select) this.props.select(e) }}></TaskListItem>
                    }) : null}
                  <AddButton text={"dodaj przedmiot"} onClick={() => { this.props.add() }}></AddButton>
                </View>
              </ScrollView>
            </View>
            <View style={{ marginTop: 10, marginBottom: 12 }}>
              <DeleteButton style={{ width: '40%', alignSelf: "center", elevation: 2 }} onClick={() => { this.props.removeGroup(this.props.group) }}></DeleteButton>
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
  header: {
    backgroundColor: "#f00",
    height: 10,
    marginTop: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textSmall: {
    fontSize: 12,
    color: "#A8A8A8",
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  textMedium: {
    alignSelf: "flex-end",
    fontSize: 32,
    fontStyle: "italic",
    color: "#464646"
  },
  headerInput: {
    backgroundColor: "#eee",
    textAlign: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    fontSize: 18,
    paddingVertical: 5
  },
  textInput: {
    backgroundColor: "#eee",
    textAlign: "center",
    borderRadius: 8,
    fontSize: 18,
    paddingVertical: 5
  },
  itemList: {
    marginTop: 10,
    backgroundColor: "pink"
  }
});

export default EditGroupScreen;

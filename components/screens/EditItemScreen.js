import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Group, TextInput, KeyboardAvoidingView } from 'react-native';
import ColourButton from '../buttons/ColourButton';
import AddButton from '../buttons/AddButton';
import IconButton from '../buttons/IconButton';
import DeleteButton from '../buttons/DeleteButton';
import HomescreenListItem from '../list-items/HomescreenListItem';

class EditItemScreen extends Component {
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
        {(this.props.item) ?
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <View>
                <Text style={{ ...styles.textSmall, marginBottom: 8 }}>podgląd</Text>
                <HomescreenListItem item={this.props.item}></HomescreenListItem>
              </View>
              <View style={{}}>
                <Text style={{ ...styles.textSmall, marginTop: 8, marginBottom: 4 }}>nazwa przedmiotu</Text>
                <TextInput style={styles.headerInput} onChange={(e) => { this.props.edit(1, { "name": e.nativeEvent.text }) }} value={this.props.item.name} ></TextInput>
              </View>
              <View>
                < Text style={{ ...styles.textSmall, marginTop: 10 }}>priorytet</Text>
                <View style={{ marginTop: 5, flexDirection: "row" }}>
                  <ColourButton style={{ height: 24 }} color="#FE5454" onClick={() => { this.props.edit(1, { "priority": 0 }) }}></ColourButton>
                  <ColourButton style={{ height: 24 }} color="#F1CC39" onClick={() => { this.props.edit(1, { "priority": 1 }) }}></ColourButton>
                  <ColourButton style={{ height: 24 }} color="#1ab34d" onClick={() => { this.props.edit(1, { "priority": 2 }) }}></ColourButton>
                </View>
              </View>
              <View style={{}}>
                <Text style={{ ...styles.textSmall, marginTop: 8, marginBottom: 4 }}>cena</Text>
                <TextInput style={styles.headerInput} onChange={(e) => { this.props.edit(1, { "price": e.nativeEvent.text }) }} value={this.props.item.price+""} ></TextInput>
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 12, }}>
              <DeleteButton style={{ width: '40%', alignSelf: "center", elevation: 2 }} onClick={() => { this.props.remove(this.props.item)}}></DeleteButton>
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
    borderRadius: 8,
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

export default EditItemScreen;

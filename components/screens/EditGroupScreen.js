import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Group, TextInput, KeyboardAvoidingView } from 'react-native';
import ShoppingListItem from '../list-items/ShoppingListItem'
import ColourButton from '../buttons/ColourButton';
import AddItemButton from '../buttons/AddItemButton';

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
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={25} enabled>
        {(this.props.group) ?
          <View style={{ flex: 1 }}>
            < Text style={{ ...styles.textSmall }}>nazwa kategorii</Text>
            <View style={{ ...styles.header, backgroundColor: (this.props.group.color) ? this.props.group.color : "#000" }}></View>
            <TextInput style={styles.headerInput} value={this.props.group.name} ></TextInput>
            <View>
              < Text style={{ ...styles.textSmall, marginTop: 10 }}>kolor</Text>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <ColourButton color="#FE5454"></ColourButton>
                <ColourButton color="#F1CC39"></ColourButton>
                <ColourButton color="#6F89D1"></ColourButton>
                <ColourButton color="#37E270"></ColourButton>
                <ColourButton color="pink"></ColourButton>
                <ColourButton color="purple"></ColourButton>
              </View>
            </View>
            <View>
              < Text style={{ ...styles.textSmall, marginTop: 20 }}>całkowity koszt</Text>
              < Text style={{ ...styles.textMedium }}>{this.props.group.items.reduce((acc, curr) => acc + curr.price, 0)}zł</Text>
            </View>
            < Text style={{ ...styles.textSmall, marginTop: 5 }}>przedmioty w kategorii</Text>
            <ScrollView style={{}}>
              <View style={{ margin: 10 }}>
                {(this.props.group.items) ?
                  this.props.group.items.map((e, i) => {
                    return <ShoppingListItem key={i} edited={(this.props.item && e == this.props.item)} edit={this.props.edit} item={e}></ShoppingListItem>
                  }) : null}
                <AddItemButton onClick={() => { this.props.add() }}></AddItemButton>
              </View>
            </ScrollView>
          </View> : null}
      </KeyboardAvoidingView >
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

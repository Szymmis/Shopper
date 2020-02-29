import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Task } from '../logic/Logic';

import DeleteButton from '../buttons/DeleteButton';
import ColourButton from '../buttons/ColourButton';
import IconButton from '../buttons/IconButton';
import HomescreenListItem from '../list-items/HomescreenListItem';

class ItemPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            if (this.refs.name) this.refs.name.blur();
            if (this.refs.notes) this.refs.notes.blur();
        });
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    render() {
        console.log(this.props.selected);
        return (
            <View style={styles.container}>
                {(this.props.selected) ?
                    <View>
                        <View>
                            <Text style={{ ...styles.textSmall, marginBottom: 6 }}> podgląd</Text>
                            <HomescreenListItem item={this.props.selected}></HomescreenListItem>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textSmall}> nazwa przedmiotu </Text>
                            <TextInput ref="name" value={this.props.selected.name} style={styles.textInput} onChange={(e) => { this.props.edit(1, { 'name': e.nativeEvent.text }) }}></TextInput>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textSmall}> priorytet</Text>
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <ColourButton style={{ height: 24 }} color={"#1ab34d"} onClick={() => this.props.edit(1, { 'priority': 2 })}></ColourButton>
                                <ColourButton style={{ height: 24 }} color={"#f1cc39"} onClick={() => this.props.edit(1, { 'priority': 1 })}></ColourButton>
                                <ColourButton style={{ height: 24 }} color={"#FE5454"} onClick={() => this.props.edit(1, { 'priority': 0 })}></ColourButton>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textSmall}> cena przedmiotu </Text>
                            <TextInput ref="name" value={this.props.selected.price} style={styles.textInput} onChange={(e) => { this.props.edit(1, { 'price': e.nativeEvent.text }) }}></TextInput>
                        </View>
                        <View style={{ ...styles.section }}>
                            <Text style={styles.textSmall}> usuń zadanie </Text>
                            <DeleteButton style={{ width: "30%", alignSelf: "center", elevation: 2, marginTop: 8 }} onClick={() => { (this.props.remove) ? this.props.remove(1, this.props.selected) : '' }}></DeleteButton>
                        </View>
                    </View>

                    : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    textSmall: {
        fontSize: 12,
        color: "#A8A8A8",
        fontStyle: "italic",
        alignSelf: "flex-end",
    },
    textInput: {
        marginTop: 5,
        backgroundColor: "#eee",
        textAlign: "center",
        borderRadius: 8,
        fontSize: 16,
        paddingVertical: 2.5
    },
    section: {
        marginBottom: 10,
    }
})


export default ItemPopup;

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { Task } from '../logic/Logic';
import Icon from 'react-native-vector-icons/FontAwesome';
import ColourButton from '../buttons/ColourButton';
import IconButton from '../buttons/IconButton';
import TaskListItem from '../list-items/TaskListItem';
import DeleteButton from '../buttons/DeleteButton';

class TaskPopup extends Component {
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
        return (
            <View style={styles.container}>
                {(this.props.selected) ?
                    <View>
                        <View>
                            <Text style={{ ...styles.textSmall, marginBottom: 6 }}> podgląd</Text>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <TaskListItem item={this.props.selected}></TaskListItem>
                                </View>
                                <TouchableOpacity onPress={() => { this.props.edit(0, { 'done': !this.props.selected.done }); }} activeOpacity={0.75} style={{ display: 'flex', alignItems: "center", justifyContent: "center", backgroundColor: "gray", marginLeft: 4, width: 30, height: 30, alignSelf: "flex-start", borderRadius: 8 }}>
                                    {(this.props.selected.done) ? <Icon name={"check"} size={26} color={"white"} ></Icon> : null}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ ...styles.section, marginTop: 8 }}>
                            <Text style={styles.textSmall}> treść zadania</Text>
                            <TextInput ref="name" value={this.props.selected.name} style={styles.textInput} onChange={(e) => { this.props.edit(0, { 'name': e.nativeEvent.text }) }}></TextInput>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textSmall}> priorytet</Text>
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <ColourButton style={{ height: 24 }} color={"#1ab34d"} onClick={() => this.props.edit(0, { 'priority': 2 })}></ColourButton>
                                <ColourButton style={{ height: 24 }} color={"#f1cc39"} onClick={() => this.props.edit(0, { 'priority': 1 })}></ColourButton>
                                <ColourButton style={{ height: 24 }} color={"#FE5454"} onClick={() => this.props.edit(0, { 'priority': 0 })}></ColourButton>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.textSmall}> godzina </Text>
                            <TextInput ref="name" value={this.props.selected.time} style={{ ...styles.textInput }} onChange={(e) => { this.props.edit(0, { 'time': e.nativeEvent.text }) }} ></TextInput>
                        </View>
                        <View style={{ ...styles.section }}>
                            <Text style={styles.textSmall}> usuń zadanie </Text>
                            <DeleteButton style={{ width: "30%", alignSelf: "center", elevation: 2, marginTop: 8 }} onClick={() => { (this.props.remove) ? this.props.remove(0, this.props.selected) : '' }}></DeleteButton>
                        </View>
                    </View>
                    : null
                }
            </View >
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


export default TaskPopup;

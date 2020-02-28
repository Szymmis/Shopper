import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import IconButton from '../buttons/IconButton';

const priorities = ["#FE5454", "#F1CC39", "#1ab34d"];

class TaskListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {(this.props.item) ?
                    <View style={{ flexDirection: "row", marginBottom: 8, borderRadius: 8, }}>
                        <View style={{ ...styles.header, width: (this.props.done) ? 30 : 10, backgroundColor: (this.props.item.priority != undefined) ? priorities[Math.min(this.props.item.priority, priorities.length)] : "#000" }}>
                            {(this.props.done) ? <IconButton name="check" style={{}} size={20} color={"white"}></IconButton> : null}
                        </View>
                        <TouchableOpacity style={{ ...styles.container, backgroundColor: (this.props.done) ? "#454545" : "#fff" }} onPress={this.props.onPress}>
                            <View style={{ ...styles.content, }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>
                                    <Text style={{ color: (this.props.done) ? "white" : "black" }}> {this.props.item.name} </Text>
                                    <Text style={{ ...styles.textSmall, marginTop: -2 }}> {this.props.item.time ? this.props.item.time : ''}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* <View style={{width: 30, height: 30, elevation: 4, backgroundColor: "#bbb", marginLeft: 10, borderRadius: 8}}></View> */}
                    </View>
                    : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        elevation: 4,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        flex: 1
    },
    header: {
        backgroundColor: "#f00",
        width: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        elevation: 4,
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        color: "black"
    },
    textSmall: {
        fontSize: 12,
        color: "#A8A8A8",
        fontStyle: "italic",
    },
    content: {
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default TaskListItem
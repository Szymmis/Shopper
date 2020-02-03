import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

class GroupsListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.edit(this.props.group) }} style={{ ...styles.container }}>
                <View style={{ ...styles.header, backgroundColor: (this.props.group.header) ? this.props.group.header : "#000" }}></View>
                <View style={{ flex: 1, padding: 9, paddingTop: 6, flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={styles.text}> {this.props.group.name} </Text>
                        <Text style={styles.textSmall}> {this.props.group.items.length} przedmioty </Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.textSmall}> całkowity koszt </Text>
                        <Text style={{ ...styles.text, color: "#007844", fontStyle: "italic" }}> {this.props.group.items.reduce((acc, curr) => { return acc + curr.price; }, 0)}zł</Text>
                        {/* <Text style={styles.textSmall}> utworzona {new Date().getUTCDate()}.{new Date().getUTCMonth()}</Text> */}

                    </View>
                </View>
                <View style={styles.prioritiesBar}>
                    <View style={{ width: "60%", height: 10, backgroundColor: "#FE5454" }}></View>
                    <View style={{ width: "20%", height: 10, backgroundColor: "#F1CC39" }}></View>
                    <View style={{ width: "20%", height: 10, backgroundColor: "#37E270" }}></View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 10,
        marginHorizontal: 5,
        borderRadius: 8,
    },
    header: {
        backgroundColor: "#f00",
        height: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    text: {
        fontSize: 18,
        color: "#454545"
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
    },
    prioritiesBar: {
        flexDirection: "row",
        backgroundColor: "#000",
        marginBottom: 10,
        marginHorizontal: 10,
    },
})

export default GroupsListItem
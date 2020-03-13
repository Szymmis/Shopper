import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

class AddButton extends Component {
    render() {
        return (
            // <TouchableOpacity onPress={this.props.onClick} style={styles.container}>
            //     <View style={{ ...styles.header, width: 12, backgroundColor: "#000" }}>
            //     </View>
            //     <Text style={styles.text}>{this.props.text}</Text>
            // </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", marginBottom: 8, borderRadius: 8, height: 30 }} onPress={this.props.onClick} >
                <View style={{ ...styles.header, width: 12 }}>
                </View>
                <View style={{ ...styles.container, }}>
                    <View style={{ ...styles.content, }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>
                            <Text style={styles.text}>{this.props.text}</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={{width: 30, height: 30, elevation: 4, backgroundColor: "#bbb", marginLeft: 10, borderRadius: 8}}></View> */}
            </TouchableOpacity>
        )
    }
}

const COLOR = "#cfcfcf";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        flex: 1,
        borderWidth: 2,
        borderColor: COLOR,
        borderStyle: "dashed",
        // borderLeftWidth: 0,
        marginLeft: -3,
    },
    header: {
        backgroundColor: COLOR,
        width: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        justifyContent: "center",
        elevation: 2,
    },
    text:{
        fontStyle: "italic",
        color: COLOR,
    },
    content: {
        padding: 5,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default AddButton
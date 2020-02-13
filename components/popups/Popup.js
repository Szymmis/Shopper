import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

class Popup extends Component {
    defaultHeight;

    constructor(props) {
        super(props);

        this.defaultHeight = this.props.height;

        this.state = {
            fadeAnim: new Animated.Value(1),
            position: new Animated.Value(0),
            height: new Animated.Value(this.defaultHeight ? this.defaultHeight : Dimensions.get("window").height / 2)
        };
    }

    show() {
        Animated.timing(this.state.position, {
            toValue: 0,
            duration: this.props.speed ? this.props.speed : 1000
        }).start();
    }

    resize(value, time) {
        Animated.timing(this.state.height, {
            toValue: value,
            duration: time ? time : 1000
        }).start();
    }

    hide() {
        Animated.timing(this.state.position, {
            toValue: -this.props.height,
            duration: this.props.speed ? this.props.speed : 1000
        }).start();
    }

    render() {
        return (
            <View>
                <Animated.View style={{ ...styles.container, height: this.state.height, bottom: this.state.position }}>
                    <View style={{ ...styles.header }}></View>
                    <View style={{ ...styles.content, }}>
                        {this.props.content}
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        alignSelf: "center",
        elevation: 10
    },
    content: {
        backgroundColor: "#fff",
        width: "100%",
        flex: 1,
        elevation: 10
    },
    header: {
        height: 10,
        width: "100%",
        backgroundColor: "#252525",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }
})

export default Popup;

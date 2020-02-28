import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

class Popup extends Component {
    defaultHeight;
    maxOpacity;

    constructor(props) {
        super(props);

        this.defaultHeight = (this.props.height) ? this.props.height : Dimensions.get("window").height / 2;
        this.maxOpacity = (this.props.opacity) ? this.props.opacity : 0.5


        this.state = {
            visibility: false,
            clickableThrough: true,
            interactable: false,
            opacity: new Animated.Value(0),
            position: new Animated.Value(-this.defaultHeight),
            height: new Animated.Value(this.defaultHeight)
        };
    }

    show() {
        this.setState({ clickableThrough: false, visibility: true });

        Animated.timing(this.state.position, {
            toValue: 0,
            duration: this.props.speed ? this.props.speed : 1000
        }).start(() => {
            this.setState({ interactable: true })
        });
        Animated.timing(this.state.opacity, {
            toValue: this.maxOpacity,
            duration: this.props.speed ? this.props.speed / 3 * 2 : 1000
        }).start();
    }

    hide() {
        console.log("o co chodzi?")
        this.setState({ interactable: false })
        Animated.timing(this.state.position, {
            toValue: -this.props.height,
            duration: this.props.speed ? this.props.speed : 1000
        }).start(() => {
            this.setState({ clickableThrough: true, visibility: false });
        });
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: this.props.speed ? this.props.speed / 3 * 2 : 1000
        }).start();
    }

    resize(value, time) {
        Animated.timing(this.state.height, {
            toValue: value,
            duration: time ? time : 1000
        }).start();
    }

    render() {
        const backgroundColor = this.state.opacity.interpolate({
            inputRange: [0, this.maxOpacity],
            outputRange: [`rgba(0,0,0,0)`, `rgba(0,0,0,${this.maxOpacity})`]
        })

        return (
            <View style={{ ...styles.container, elevation: 10 }} pointerEvents={(this.state.clickableThrough) ? "none" : "auto"}>
                <Animated.View style={{ ...styles.container, backgroundColor, opacity: (this.state.visibility) ? 1 : 0 }} >
                    <Animated.View style={{ ...styles.popupContainer, height: this.state.height, bottom: this.state.position }} pointerEvents={(this.state.interactable) ? "auto" : "none"}>
                        <View style={{ ...styles.header }}></View>
                        <View style={{ ...styles.content, }}>
                            {this.props.content}
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: '100%',
        height: "100%",
    },
    popupContainer: {
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

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from './buttons/IconButton';

const MONTHS = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]

function numberOfDays(month) {
    let _year = new Date().getFullYear();
    return (month % 2 == 0) ? 31 : ((month == 1) ? (((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0) ? 29 : 28) : 30);
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: (this.props.currentMonth) ? this.props.currentMonth : new Date().getUTCMonth(),
            selectedDay: new Date().getDate(),
            year: 2020,
        };
    }

    getFormated() {
        let formated = [];
        if (this.props.format) {
            for (let i = 0; i < Object.keys(this.props.format).length; i++) {
                let _key = Object.keys(this.props.format)[i];
                let splits = _key.split("_");
                if (splits[1] == this.state.month) {
                    formated[parseInt(splits[0])-1] = this.props.format[_key];
                }
            }
        }

        return formated;
    }

    getColor(formated, day, dayOfWeek) {

        if (day >= 0 && day < numberOfDays(this.state.month)) {
            if (day < formated.length && formated[day]) {
                return formated[day];
            }

            //Jeśli sobota lub niedziela
            if (dayOfWeek % 7 == 5 || dayOfWeek % 7 == 6)
                return "#ffdae0"
            //Normalny dzień tygodnia
            else
                return "#f2f2f2"
        }

        return "rgba(255,255,255,0)";
    }

    async select(day) {
        if (!this.props.hideSelected)
            await this.setState({ selectedDay: day });

        if (this.props.onSelect)
            this.props.onSelect(day + '_' + this.state.month + '_' + this.state.year);

    }

    render() {
        let formated = this.getFormated();

        let _date = new Date();
        let _offset = ((new Date(_date.getUTCFullYear(), this.state.month, 1).getDay() + 7) - 1) % 7;
        let number_of_weeks = Math.ceil((numberOfDays(this.state.month) + _offset - 1) / 7);
        let toRender = [];
        for (let i = 0; i < number_of_weeks; i++) {
            let dayElements = [];
            let _counter = 0;
            for (let j = i * 7 - _offset; j < i * 7 - _offset + 7; j++ , _counter++) {
                selected = (!!!this.props.hideSelected && j == this.state.selectedDay - 1) ? styles.selected : {};
                isToday = (j + 1 == _date.getDate() && _date.getUTCMonth() == this.state.month) ? styles.today : {};
                color = { backgroundColor: this.getColor(formated, j, _counter) };
                dayElements.push(<TouchableOpacity
                    onPress={() => { if (j >= 0 && j < numberOfDays(this.state.month)) { this.select(j + 1); } }}
                    key={j}
                    style={{ ...styles.day, ...isToday, ...color, ...selected }}>
                    <Text style={{ color: "black" }}>
                        {(j >= 0 && j < numberOfDays(this.state.month)) ? j + 1 : ''}
                    </Text>
                </TouchableOpacity >)
            }

            toRender.push(<View key={i} style={styles.week}>{dayElements}</View>)
        }

        return (
            <View>
                <View>
                    <View style={styles.toolbar}>
                        <IconButton style={{ flex: 1 }} size={24} name={"chevron-left"} color={"#252525"} onClick={async () => { await this.setState({ month: (this.state.month + 11) % 12 }); this.select(this.state.selectedDay); }}></IconButton>
                        <View>
                            <View style={{ ...styles.header, backgroundColor: "#252525" }}>
                                <Text style={{ color: "white", textAlign: "center", marginVertical: 2 }}>{this.state.year}</Text>
                            </View>
                            <View style={styles.monthHeader}>
                                <Text style={styles.textMonth}>{MONTHS[this.state.month]}</Text>
                            </View>
                        </View>
                        <IconButton style={{ flex: 1 }} size={24} name={"chevron-right"} color={"#252525"} onClick={async () => { await this.setState({ month: (this.state.month + 1) % 12 }); this.select(this.state.selectedDay); }}></IconButton>
                    </View>
                </View>
                <View style={styles.calendar}>
                    {toRender}
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    monthHeader: {
        backgroundColor: "#fff",
        elevation: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    toolbar: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    header: {
        backgroundColor: "#f00",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    textMonth: {
        fontSize: 22,
    },
    calendar: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    day: {
        width: 32,
        height: 32,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
    },
    week: {
        flexDirection: "row",
        marginBottom: 6,
    },
    today: {
        borderWidth: 2,
        borderColor: "#7488ff",
    },
    selected: {
        backgroundColor: "#c1c9ff"
    }
})

export default Calendar;

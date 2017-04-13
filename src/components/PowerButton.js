/*
    Power, a wake on LAN mobile application.
    Copyright (C) 2017  Scott Bouloutian

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component, PropTypes } from 'react';
import { Animated, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    button: {
        display: 'flex',
        width: 150,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 16,
        borderRadius: 10,
        backgroundColor: '#e74c3c',
        borderBottomWidth: 6,
        borderStyle: 'solid',
        borderBottomColor: '#bd3e31',
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        textShadowOffset: {
            width: 0,
            height: -2,
        },
        textShadowColor: '#bd3e31',
        textAlign: 'center',
        fontFamily: 'Pacifico',
    },
});

class PowerButton extends Component {
    constructor() {
        super();
        this.state = {
            translateY: new Animated.Value(0),
        };
    }

    componentDidMount() {
    }

    render() {
        const { text, onPress } = this.props;
        const { translateY } = this.state;
        const negativeTranslation = Animated.multiply(-1, translateY);
        const translationStyle = {
            transform: [
                { translateY },
            ],
            borderBottomWidth: Animated.add(6, negativeTranslation),
        };
        const pressIn = () => {
            Animated.timing(this.state.translateY, {
                toValue: 5,
                duration: 100,
            }).start();
        };
        const pressOut = () => {
            Animated.timing(this.state.translateY, {
                toValue: 0,
                duration: 100,
            }).start();
        };
        return (
            <TouchableWithoutFeedback onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
                <Animated.View style={[styles.button, translationStyle]}>
                    <Text style={styles.buttonText}>{text}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

PowerButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default PowerButton;

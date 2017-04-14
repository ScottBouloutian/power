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

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doneButtonPressed } from '../actions/device';

const styles = StyleSheet.create({
    headerButton: {
        margin: 16,
    },
});

function DeviceHeader(props) {
    const { canSave, save, navigation } = props;
    const onPress = () => {
        save();
        navigation.goBack();
    };
    const color = canSave ? '#c0392b' : '#bdc3c7';
    return (
        <TouchableOpacity style={styles.headerButton} disabled={!canSave} onPress={onPress}>
            <Icon name="floppy-o" size={18} color={color} />
        </TouchableOpacity>
    );
}

DeviceHeader.propTypes = {
    canSave: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    navigation: PropTypes.shape({

    }).isRequired,
};

const mapStateToProps = state => ({
    canSave: state.app.nameValid && state.app.macValid,
});

const mapDispatchToProps = dispatch => ({
    save: () => dispatch(doneButtonPressed),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceHeader);

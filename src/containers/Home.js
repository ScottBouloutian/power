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

import React, { PropTypes, Component } from 'react';
import {
    View, ListView, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isEqual } from 'lodash';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import PowerButton from '../components/PowerButton';
import { wakeOnLan } from '../actions/wol';
import { trashButtonPressed } from '../actions/device';

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listView: {
        backgroundColor: '#ecf0f1',
    },
    headerButton: {
        padding: 16,
    },
    deviceView: {
        alignItems: 'center',
        width: '100%',
        height: 175,
        backgroundColor: '#ecf0f1',
    },
    deviceTitle: {
        marginTop: 16,
        fontSize: 24,
        color: '#2c3e50',
    },
    deviceSubtitle: {
        fontSize: 12,
        color: '#34495e',
    },
    deleteButton: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#e74c3c',
    },
    trashIcon: {
        width: 100,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bdc3c7',
    },
    welcomeText: {
        width: 200,
        color: '#c0392b',
        fontSize: 18,
        textAlign: 'center',
    },
});

const renderRow = rowProps => (device, section, row) => {
    const { wake, trash } = rowProps;
    const index = Number(row);
    return (
        <SwipeRow disableRightSwipe rightOpenValue={-100} stopRightSwipe={-150}>
            <View style={styles.deleteButton}>
                <TouchableOpacity style={styles.trashIcon} onPress={trash(index)}>
                    <Icon name="trash" size={18} color="#ecf0f1" />
                </TouchableOpacity>
            </View>
            <View style={styles.deviceView} >
                <Text style={styles.deviceTitle}>{device.name}</Text>
                <Text style={styles.deviceSubtitle}>{device.mac}</Text>
                <PowerButton text="Power On" onPress={wake(device.mac)} />
            </View>
        </SwipeRow>
    );
};

const renderSeparator = () => (
    <View style={styles.separator} />
);

class Home extends Component {
    constructor() {
        super();
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !isEqual(r1, r2),
        });
    }

    render() {
        const { devices, wake, trash } = this.props;
        this.dataSource = this.dataSource.cloneWithRows(devices);
        const getStarted = (
            <View style={styles.view}>
                <Text style={styles.welcomeText}>
                    Touch the + in the top right corner to add a device!
                </Text>
            </View>
        );
        const deviceList = (
            <SwipeListView
              style={styles.listView}
              dataSource={this.dataSource}
              renderRow={renderRow({ wake, trash })}
              renderSeparator={renderSeparator}
              enableEmptySections
            />
        );
        return (devices.length === 0) ? getStarted : deviceList;
    }
}

Home.navigationOptions = {
    header: ({ navigate }) => {
        const navigateInfoPage = () => navigate('Info');
        const navigateAddPage = () => navigate('Device');
        return {
            left: (
                <TouchableOpacity style={styles.headerButton} onPress={navigateInfoPage}>
                    <Icon name="info" size={18} color="#c0392b" />
                </TouchableOpacity>
            ),
            right: (
                <TouchableOpacity style={styles.headerButton} onPress={navigateAddPage}>
                    <Icon name="plus" size={18} color="#c0392b" />
                </TouchableOpacity>
            ),
        };
    },
};

Home.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object).isRequired,
    wake: PropTypes.func.isRequired,
    trash: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    devices: state.app.devices,
});

const mapDispatchToProps = dispatch => ({
    wake: mac => () => dispatch(wakeOnLan(mac)),
    trash: index => () => dispatch(trashButtonPressed(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

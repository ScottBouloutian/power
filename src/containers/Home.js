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
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    headerButton: {
        margin: 16,
    },
    deviceView: {
        display: 'flex',
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
        return (
            <SwipeListView
              style={styles.view}
              dataSource={this.dataSource}
              renderRow={renderRow({ wake, trash })}
              renderSeparator={renderSeparator}
              enableEmptySections
            />
        );
    }
}

Home.navigationOptions = {
    title: 'Power',
    header: ({ navigate }) => {
        const navigateAddPage = () => navigate('Device');
        return {
            right: (
                <TouchableOpacity style={styles.headerButton} onPress={navigateAddPage}>
                    <Icon name="plus" size={18} />
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

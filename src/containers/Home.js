import React, { PropTypes, Component } from 'react';
import { View, ListView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isEqual } from 'lodash';
import PowerButton from '../components/PowerButton';
import { wakeOnLan } from '../actions/wol';

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
});

const renderRow = wake => device => (
    <View style={styles.deviceView}>
        <Text style={styles.deviceTitle}>{device.name}</Text>
        <Text style={styles.deviceSubtitle}>{device.mac}</Text>
        <PowerButton text="Power On" onPress={wake(device.mac)} />
    </View>
);

class Home extends Component {
    constructor() {
        super();
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !isEqual(r1, r2),
        });
    }

    render() {
        const { devices, wake } = this.props;
        this.dataSource = this.dataSource.cloneWithRows(devices);
        return (
            <ListView
              style={styles.view}
              dataSource={this.dataSource}
              renderRow={renderRow(wake)}
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
};

const mapStateToProps = state => ({
    devices: state.app.devices,
});

const mapDispatchToProps = dispatch => ({
    wake: mac => () => dispatch(wakeOnLan(mac)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

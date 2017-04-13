import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { macTextChanged, nameTextChanged } from '../actions/device';
import DeviceHeader from './DeviceHeader';

const styles = StyleSheet.create({
    view: {
        display: 'flex',
    },
    input: {
        textAlign: 'center',
        height: 40,
        backgroundColor: 'white',
    },
    label: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        margin: 8,
        borderRadius: 4,
    },
});

function Device(props) {
    const {
        nameText, macText, nameValid, macValid, macChanged, nameChanged,
    } = props;
    const validStyle = valid => ({
        backgroundColor: valid ? '#2ecc71' : '#e74c3c',
    });
    return (
        <View style={styles.view}>
            <View style={styles.label}>
                <Text>Device Name</Text>
                <View style={[styles.dot, validStyle(nameValid)]} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="My Device"
              autoCorrect={false}
              value={nameText}
              onChangeText={nameChanged}
            />
            <View style={styles.label}>
                <Text>Media Access Control Address (MAC Address)</Text>
                <View style={[styles.dot, validStyle(macValid)]} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="00:00:00:00:00:00"
              autoCorrect={false}
              value={macText}
              maxLength={17}
              onChangeText={macChanged}
            />
        </View>
    );
}

Device.navigationOptions = {
    title: 'Add Device',
    header: navigation => ({
        right: (
            <DeviceHeader navigation={navigation} />
        ),
    }),
};

Device.propTypes = {
    nameText: PropTypes.string.isRequired,
    macText: PropTypes.string.isRequired,
    nameValid: PropTypes.bool.isRequired,
    macValid: PropTypes.bool.isRequired,
    macChanged: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    nameText: state.app.nameText,
    macText: state.app.macText,
    nameValid: state.app.nameValid,
    macValid: state.app.macValid,
});

const mapDispatchToProps = dispatch => ({
    macChanged: text => dispatch(macTextChanged(text)),
    nameChanged: text => dispatch(nameTextChanged(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Device);
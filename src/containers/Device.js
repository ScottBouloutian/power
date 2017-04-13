import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { macTextChanged, nameTextChanged, doneButtonPressed } from '../actions/device';

const styles = StyleSheet.create({
    view: {
        display: 'flex',
    },
    label: {
        margin: 16,
        textAlign: 'center',
    },
    input: {
        textAlign: 'center',
        height: 40,
        backgroundColor: 'white',
    },
});

function Device(props) {
    const {
        macText, nameText, macChanged, nameChanged, buttonDisabled, donePressed
    } = props;
    return (
        <View style={styles.view}>
            <Text style={styles.label}>Device Name</Text>
            <TextInput
              style={styles.input}
              placeholder="My Device"
              autoCorrect={false}
              value={nameText}
              onChangeText={nameChanged}
            />
            <Text style={styles.label}>Media Access Control Address (MAC Address)</Text>
            <TextInput
              style={styles.input}
              placeholder="00:00:00:00:00:00"
              autoCorrect={false}
              value={macText}
              maxLength={17}
              onChangeText={macChanged}
            />
            <Button title="Done" disabled={buttonDisabled} onPress={donePressed} />
        </View>
    );
}

Device.navigationOptions = {
    title: 'Add Device',
};

Device.propTypes = {
    macText: PropTypes.string.isRequired,
    nameText: PropTypes.string.isRequired,
    macChanged: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    donePressed: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    macText: state.app.macText,
    nameText: state.app.nameText,
    buttonDisabled: !state.app.nameValid || !state.app.macValid,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const { navigation } = ownProps;
    return {
        macChanged: text => dispatch(macTextChanged(text)),
        nameChanged: text => dispatch(nameTextChanged(text)),
        donePressed: () => {
            dispatch(doneButtonPressed);
            dispatch(navigation.goBack());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);

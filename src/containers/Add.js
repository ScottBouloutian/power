import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { macTextChanged, addButtonPressed } from '../actions/add';

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

function Add(props) {
    const { text, textChanged, buttonDisabled, donePressed } = props;
    return (
        <View style={styles.view}>
            <Text style={styles.label}>Media Access Control Address (MAC Address)</Text>
            <TextInput
              style={styles.input}
              placeholder="00:00:00:00:00:00"
              autoCorrect={false}
              value={text}
              maxLength={17}
              onChangeText={textChanged}
            />
            <Button title="Done" disabled={buttonDisabled} onPress={donePressed} />
        </View>
    );
}

Add.navigationOptions = {
    title: 'Add Device',
};

Add.propTypes = {
    text: PropTypes.string.isRequired,
    textChanged: PropTypes.func.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    donePressed: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    text: state.app.macText,
    buttonDisabled: !state.app.macValid,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const { navigation } = ownProps;
    return {
        textChanged: text => dispatch(macTextChanged(text)),
        donePressed: () => {
            dispatch(addButtonPressed);
            dispatch(navigation.goBack());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

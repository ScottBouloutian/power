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
    const color = canSave ? '#000000' : '#bdc3c7';
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

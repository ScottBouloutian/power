import React, { PropTypes } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    touchable: {
        width: 232,
        height: 40,
        margin: 8,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        width: '100%',
    },
    text: {
        color: '#ecf0f1',
        textAlign: 'center',
        width: 174,
        marginLeft: 8,
    },
});

function IconButton({ icon, text, onPress, color }) {
    return (
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={[styles.button, { backgroundColor: color }]}>
                <Icon name={icon} color="#ecf0f1" size={18} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}
IconButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
};
IconButton.defaultProps = {
    color: '#e74c3c',
};
export default IconButton;

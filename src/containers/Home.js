import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import PowerButton from '../components/PowerButton';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    headerButton: {
        margin: 16,
    },
});

function Home() {
    return (
        <View style={styles.view}>
            <PowerButton text="Power" />
        </View>
    );
}

Home.navigationOptions = {
    title: 'Power',
    header: ({ navigate }) => {
        const navigateAddPage = () => navigate('Add');
        return {
            right: (
                <TouchableOpacity style={styles.headerButton} onPress={navigateAddPage}>
                    <Icon name="plus" size={24} />
                </TouchableOpacity>
            ),
        };
    },
};

export default connect()(Home);

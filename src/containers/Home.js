import React, { PropTypes, Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PowerButton from '../components/PowerButton';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});

class Home extends Component {
    componentWillMount() {
        const { setNavigationState } = this.props;
        setNavigationState();
    }

    render() {
        return (
            <View style={styles.view}>
                <PowerButton text="Power" />
            </View>
        );
    }
}

Home.propTypes = {
    setNavigationState: PropTypes.func.isRequired,
};

Home.navigationOptions = {
    title: 'Power',
};

const mapStateToProps = (state, ownProps) => ({
    setNavigationState: () => {
        const { navigation } = ownProps;
        const navigateInfo = () => navigation.navigate('Info');
        navigation.setParams({
            navigateInfo,
        });
    },
});

export default connect(mapStateToProps)(Home);

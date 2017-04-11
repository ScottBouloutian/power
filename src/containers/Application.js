import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { assign } from 'lodash';
import Navigator from '../components/Navigator';
import { restorePurchases } from '../actions/purchases';
import AdMob from './AdMob';

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
    },
});

function Application({ navigation, load, showAds }) {
    const ads = showAds ? <AdMob /> : null;
    return (
        <View style={styles.view} onLayout={load}>
            <Navigator navigation={navigation} />
            { ads }
        </View>
    );
}

Application.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
    load: PropTypes.func.isRequired,
    showAds: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { navigation, purchases } = state;
    return {
        navigation,
        showAds: purchases.loaded && !purchases.removeAds,
    };
};

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(restorePurchases).catch(() => {}),
    dispatch,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const navigationHelpers = addNavigationHelpers({
        dispatch: dispatchProps.dispatch,
        state: stateProps.navigation,
    });
    const result = assign({ }, ownProps, stateProps, dispatchProps);
    result.navigation = navigationHelpers;
    delete result.dispatch;
    return result;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Application);

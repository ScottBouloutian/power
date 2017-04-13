/*
    Power, a wake on LAN mobile application.
    Copyright (C) 2017  Scott Bouloutian

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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

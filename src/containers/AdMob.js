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
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
import { connect } from 'react-redux';
import { showInterstitial } from '../actions/ads';

const bannerId = 'ca-app-pub-4400088783500800/8409121774';
const interstitialId = 'ca-app-pub-4400088783500800/9885854976';

AdMobInterstitial.setAdUnitID(interstitialId);
AdMobInterstitial.setTestDeviceID('EMULATOR');

function AdMob(props) {
    const { launching, showInterstitialAd } = props;
    if (launching) {
        showInterstitialAd();
    }
    return (
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={bannerId}
          testDeviceID="EMULATOR"
        />
    );
}

AdMob.propTypes = {
    launching: PropTypes.bool.isRequired,
    showInterstitialAd: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    launching: state.app.launching,
});

const mapDispatchToProps = dispatch => ({
    showInterstitialAd: () => dispatch(showInterstitial),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdMob);

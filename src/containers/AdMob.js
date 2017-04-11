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

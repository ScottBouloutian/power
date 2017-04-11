import { AdMobInterstitial } from 'react-native-admob';
import Promise from 'bluebird';

const requestAd = () => new Promise(resolve => AdMobInterstitial.requestAd(() => resolve()));
const showAd = () => new Promise(resolve => AdMobInterstitial.showAd(() => resolve()));

export const SHOW_INTERSTITIAL = 'SHOW_INTERSTITIAL';
export const showInterstitial = dispatch => (
    dispatch({
        type: SHOW_INTERSTITIAL,
        payload: requestAd().then(() => showAd()),
    })
);

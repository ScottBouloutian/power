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

import { AdMobInterstitial } from 'react-native-admob';
import Promise from 'bluebird';

const requestAd = () => new Promise(resolve => AdMobInterstitial.requestAd(() => resolve()));
const showAd = () => new Promise(resolve => AdMobInterstitial.showAd(() => resolve()));

export const SHOW_INTERSTITIAL = 'SHOW_INTERSTITIAL';
export const showInterstitial = () => ({
    type: SHOW_INTERSTITIAL,
    payload: requestAd().then(() => showAd()),
});

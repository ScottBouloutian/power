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

import { NativeModules } from 'react-native';
import Promise from 'bluebird';

const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const PURCHASE_PRODUCT = 'PURCHASE_PRODUCT';
export const RESTORE_PURCHASES = 'RESTORE_PURCHASES';
export const PURCHASES_ERROR = 'PURCHASES_ERROR';
export const PURCHASES_ERROR_DISMISS = 'PURCHASES_ERROR_DISMISS';
export const loadProducts = dispatch => (
    dispatch({
        type: LOAD_PRODUCTS,
        payload: InAppUtils.loadProductsAsync(['jswizard_remove_ads']),
    })
);
export const purchaseProduct = id => dispatch => (
    dispatch({
        type: PURCHASE_PRODUCT,
        payload: InAppUtils.purchaseProductAsync(id).then((response) => {
            if (!response || !response.productIdentifier) {
                throw new Error('Error purchasing product');
            }
            return response.productIdentifier;
        }).catch((error) => {
            throw new Error(error.message);
        }),
    })
);
export const restorePurchases = dispatch => (
    dispatch({
        type: RESTORE_PURCHASES,
        payload: InAppUtils.restorePurchasesAsync(),
    })
);
export const dismissError = dispatch => (
    dispatch({
        type: PURCHASES_ERROR_DISMISS,
    })
);

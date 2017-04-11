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

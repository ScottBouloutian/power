import { assign } from 'lodash';
import {
    LOAD_PRODUCTS, PURCHASE_PRODUCT, RESTORE_PURCHASES, PURCHASES_ERROR_DISMISS,
} from '../actions/purchases';

const defaultState = {
    products: [],
    removeAds: false,
    loaded: false,
    error: null,
};

// Maps a product identifier to a human readable name
const mapId = (id) => {
    switch (id) {
    case 'jswizard_remove_ads':
        return 'removeAds';
    default:
        return null;
    }
};

export default (state = defaultState, action) => {
    const updates = { };
    switch (action.type) {
    // Loading products
    case `${LOAD_PRODUCTS}_FULFILLED`:
        return assign({ }, state, {
            products: action.payload,
        });
    case `${LOAD_PRODUCTS}_REJECTED`:
        return assign({ }, state, {
            error: action.payload,
        });
    // Purchasing products
    case `${PURCHASE_PRODUCT}_FULFILLED`:
        return assign({ }, state, {
            [mapId(action.payload)]: true,
        });
    case `${PURCHASE_PRODUCT}_REJECTED`:
        return assign({ }, state, {
            error: action.payload,
        });
    // Restoring products
    case `${RESTORE_PURCHASES}_FULFILLED`:
        action.payload.forEach((purchase) => {
            const id = purchase.productIdentifier;
            updates[mapId(id)] = true;
        });
        return assign({ }, state, updates, {
            loaded: true,
        });
    case `${RESTORE_PURCHASES}_REJECTED`:
        return assign({ }, state, {
            error: action.payload,
        });
    // Dismissing errors
    case PURCHASES_ERROR_DISMISS:
        return assign({ }, state, {
            error: null,
        });
    default:
        return assign({ }, state);
    }
};

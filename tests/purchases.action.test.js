import faker from 'faker';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';

const mockAppUtils = {
    loadProductsAsync: jest.fn(),
    purchaseProductAsync: jest.fn(),
    restorePurchasesAsync: jest.fn(),
};
const middlewares = [thunk, reduxPromiseMiddleware()];
const mockStore = configureMockStore(middlewares);

jest.mock('react-native', () => ({
    NativeModules: {
        InAppUtils: mockAppUtils,
    },
}));

const {
    LOAD_PRODUCTS, PURCHASE_PRODUCT, RESTORE_PURCHASES, PURCHASES_ERROR_DISMISS,
    loadProducts, purchaseProduct, restorePurchases, dismissError,
} = require('../src/actions/purchases');

test('the exported action types', () => {
    expect(LOAD_PRODUCTS).toBeDefined();
    expect(PURCHASE_PRODUCT).toBeDefined();
    expect(RESTORE_PURCHASES).toBeDefined();
    expect(PURCHASES_ERROR_DISMISS).toBeDefined();
});

test('the load products action creator', () => {
    const result = faker.random.word();
    const store = mockStore();
    const expectedActions = [
        {
            type: `${LOAD_PRODUCTS}_PENDING`,
        },
        {
            type: `${LOAD_PRODUCTS}_FULFILLED`,
            payload: result,
        },
    ];
    mockAppUtils.loadProductsAsync.mockReturnValue(Promise.resolve(result));
    return store.dispatch(loadProducts()).then(() => {
        expect(mockAppUtils.loadProductsAsync).toBeCalledWith(['jswizard_remove_ads']);
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test('the purchase product action creator', () => {
    const store = mockStore();
    const id = faker.random.uuid();
    const productId = faker.random.uuid();
    const expectedActions = [
        {
            type: `${PURCHASE_PRODUCT}_PENDING`,
        },
        {
            type: `${PURCHASE_PRODUCT}_FULFILLED`,
            payload: productId,
        },
    ];
    mockAppUtils.purchaseProductAsync.mockReturnValue(Promise.resolve({
        productIdentifier: productId,
    }));
    return store.dispatch(purchaseProduct(id)).then(() => {
        expect(mockAppUtils.purchaseProductAsync).toBeCalledWith(id);
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test('an invalid purchase product response', () => {
    const store = mockStore();
    const id = faker.random.uuid();
    const expectedActions = [
        {
            type: `${PURCHASE_PRODUCT}_PENDING`,
        },
        {
            type: `${PURCHASE_PRODUCT}_REJECTED`,
            payload: new Error('Error purchasing product'),
            error: true,
        },
    ];
    mockAppUtils.purchaseProductAsync.mockReturnValue(Promise.resolve({ }));
    return store.dispatch(purchaseProduct(id)).catch(() => {
        expect(mockAppUtils.purchaseProductAsync).toBeCalledWith(id);
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test('the restore purchases action creator', () => {
    const store = mockStore();
    const result = faker.random.word();
    const expectedActions = [
        {
            type: `${RESTORE_PURCHASES}_PENDING`,
        },
        {
            type: `${RESTORE_PURCHASES}_FULFILLED`,
            payload: result,
        },
    ];
    mockAppUtils.restorePurchasesAsync.mockReturnValue(Promise.resolve(result));
    return store.dispatch(restorePurchases()).then(() => {
        expect(mockAppUtils.restorePurchasesAsync).toBeCalledWith();
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test('the dismiss error action', () => {
    expect(dismissError).toEqual({
        type: PURCHASES_ERROR_DISMISS,
    });
});

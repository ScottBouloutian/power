import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';

const mockAdmob = {
    AdMobInterstitial: {
        requestAd: jest.fn(callback => callback()),
        showAd: jest.fn(callback => callback()),
    },
};
jest.mock('react-native-admob', () => mockAdmob);

const { SHOW_INTERSTITIAL, showInterstitial } = require('../src/actions/ads');

const middlewares = [thunk, reduxPromiseMiddleware()];
const mockStore = configureMockStore(middlewares);

test('the exported action types', () => {
    expect(SHOW_INTERSTITIAL).toBeDefined();
});

test('the show interstitial action creator', () => {
    const store = mockStore();
    const expectedActions = [
        {
            type: `${SHOW_INTERSTITIAL}_PENDING`,
        },
        {
            type: `${SHOW_INTERSTITIAL}_FULFILLED`,
        },
    ];
    return store.dispatch(showInterstitial()).then(() => {
        expect(mockAdmob.AdMobInterstitial.requestAd.mock.calls.length).toBe(1);
        expect(mockAdmob.AdMobInterstitial.showAd.mock.calls.length).toBe(1);
        expect(store.getActions()).toEqual(expectedActions);
    });
});

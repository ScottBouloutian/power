import { assign } from 'lodash';

const defaultState = {
    appState: null,
    launching: false,
};

export default function (state = defaultState, action) {
    const launching = (
        (state.appState === 'inactive' || state.appState === 'background') &&
        action.appState === 'active'
    );
    switch (action.type) {
    case 'APP_STATE_CHANGE':
        return assign({ }, state, {
            appState: action.appState,
            launching,
        });
    default:
        return assign({ }, state);
    }
}

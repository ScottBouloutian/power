import { assign } from 'lodash';
import { MAC_TEXT_CHANGED, ADD_BUTTON_PRESSED } from '../actions/add';

const defaultState = {
    appState: null,
    launching: false,
    macText: '',
    macValid: false,
    devices: [],
};

export default function (state = defaultState, action) {
    const macRegex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;
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
    case MAC_TEXT_CHANGED:
        return assign({ }, state, {
            macText: action.text,
            macValid: macRegex.test(action.text),
        });
    case ADD_BUTTON_PRESSED:
        return assign({ }, state, {
            macText: '',
            macValid: false,
            devices: state.devices.concat(action.device),
        });
    default:
        return assign({ }, state);
    }
}

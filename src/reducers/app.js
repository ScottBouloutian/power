import { assign } from 'lodash';
import { MAC_TEXT_CHANGED, NAME_TEXT_CHANGED, DONE_BUTTON_PRESSED } from '../actions/device';

const defaultState = {
    appState: null,
    launching: false,
    macText: '',
    nameText: '',
    macValid: false,
    devices: [],
};

export default function (state = defaultState, action) {
    const macRegex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;
    const launching = (
        (state.appState === 'inactive' || state.appState === 'background') &&
        action.appState === 'active'
    );
    const devices = (action.device) ? state.devices.concat(action.device) : [];
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
    case NAME_TEXT_CHANGED:
        return assign({ }, state, {
            nameText: action.text,
        });
    case DONE_BUTTON_PRESSED:
        return assign({ }, state, {
            macText: '',
            macValid: false,
            devices,
        });
    default:
        return state;
    }
}

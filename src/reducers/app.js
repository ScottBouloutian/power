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

import { assign } from 'lodash';
import {
    MAC_TEXT_CHANGED, NAME_TEXT_CHANGED, DONE_BUTTON_PRESSED, TRASH_BUTTON_PRESSED,
} from '../actions/device';

const defaultState = {
    appState: null,
    launching: false,
    nameText: '',
    macText: '',
    nameValid: false,
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
            nameValid: (action.text.length > 0),
        });
    case DONE_BUTTON_PRESSED:
        return assign({ }, state, {
            nameText: '',
            macText: '',
            nameValid: false,
            macValid: false,
            devices,
        });
    case TRASH_BUTTON_PRESSED:
        state.devices.splice(action.index, 1);
        return assign({}, state, {
            devices: [].concat(state.devices),
        });
    default:
        return state;
    }
}

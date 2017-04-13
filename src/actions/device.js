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

export const MAC_TEXT_CHANGED = 'MAC_TEXT_CHANGED';
export const macTextChanged = text => dispatch => (
    dispatch({
        type: MAC_TEXT_CHANGED,
        text,
    })
);

export const NAME_TEXT_CHANGED = 'NAME_TEXT_CHANGED';
export const nameTextChanged = text => dispatch => (
    dispatch({
        type: NAME_TEXT_CHANGED,
        text,
    })
);

export const DONE_BUTTON_PRESSED = 'DONE_BUTTON_PRESSED';
export const doneButtonPressed = (dispatch, getState) => {
    const state = getState();
    dispatch({
        type: DONE_BUTTON_PRESSED,
        device: {
            name: state.app.nameText,
            mac: state.app.macText,
        },
    });
};

export const TRASH_BUTTON_PRESSED = 'TRASH_BUTTON_PRESSED';
export const trashButtonPressed = index => dispatch => (
    dispatch({
        type: TRASH_BUTTON_PRESSED,
        index,
    })
);

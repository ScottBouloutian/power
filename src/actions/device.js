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
    return dispatch({
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

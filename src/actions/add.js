export const MAC_TEXT_CHANGED = 'MAC_TEXT_CHANGED';
export const macTextChanged = text => dispatch => (
    dispatch({
        type: MAC_TEXT_CHANGED,
        text,
    })
);

export const ADD_BUTTON_PRESSED = 'ADD_BUTTON_PRESSED';
export const addButtonPressed = (dispatch, getState) => {
    const state = getState();
    return dispatch({
        type: ADD_BUTTON_PRESSED,
        device: {
            mac: state.app.macText,
        },
    });
};

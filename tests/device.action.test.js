import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import faker from 'faker';
import {
    MAC_TEXT_CHANGED, NAME_TEXT_CHANGED, DONE_BUTTON_PRESSED, TRASH_BUTTON_PRESSED,
    macTextChanged, nameTextChanged, doneButtonPressed, trashButtonPressed,
} from '../src/actions/device';

const middlewares = [thunk, reduxPromiseMiddleware()];
const mockStore = configureMockStore(middlewares);

test('the exported action types', () => {
    expect(MAC_TEXT_CHANGED).toBeDefined();
    expect(NAME_TEXT_CHANGED).toBeDefined();
    expect(DONE_BUTTON_PRESSED).toBeDefined();
    expect(TRASH_BUTTON_PRESSED).toBeDefined();
});

test('the mac text changed action creator', () => {
    const text = faker.internet.mac();
    expect(macTextChanged(text)).toEqual({
        type: MAC_TEXT_CHANGED,
        text,
    });
});

test('the name text changed action creator', () => {
    const text = faker.name.firstName();
    expect(nameTextChanged(text)).toEqual({
        type: NAME_TEXT_CHANGED,
        text,
    });
});

test('the done button pressed thunk', () => {
    const mockState = {
        app: {
            nameText: faker.name.firstName(),
            macText: faker.internet.mac(),
        },
    };
    const store = mockStore(mockState);
    const expectedActions = [
        {
            type: DONE_BUTTON_PRESSED,
            device: {
                name: mockState.app.nameText,
                mac: mockState.app.macText,
            },
        },
    ];
    store.dispatch(doneButtonPressed);
    expect(store.getActions()).toEqual(expectedActions);
});

test('the trash button pressed action creator', () => {
    const index = faker.random.number();
    expect(trashButtonPressed(index)).toEqual({
        type: TRASH_BUTTON_PRESSED,
        index,
    });
});

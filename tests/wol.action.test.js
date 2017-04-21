import EventEmitter from 'events';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';

const middlewares = [
    thunk,
    reduxPromiseMiddleware(),
];
const mockStore = configureMockStore(middlewares);
const mockUdp = {
    createSocket: jest.fn(),
};

class MockSocket extends EventEmitter {
    constructor() {
        super();
        this.send = jest.fn();
        this.close = jest.fn();
        this.setBroadcast = jest.fn();
    }
}

jest.mock('react-native-udp', () => mockUdp);

const { WAKE_ON_LAN, wakeOnLan } = require('../src/actions/wol');

test('the exported action types', () => {
    jest.resetAllMocks();
    expect(WAKE_ON_LAN).toBeDefined();
});

test('a successful wake on lan action', () => {
    const socket = new MockSocket();
    const store = mockStore({ });
    const mac = '12:34:56:78:9a:bc';
    const packet = new Uint8Array([
        255, 255, 255, 255, 255, 255,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
        18, 52, 86, 120, 154, 188, 18, 52, 86, 120, 154, 188,
    ]);
    mockUdp.createSocket.mockReturnValue(socket);
    socket.send.mockImplementation((arg1, arg2, arg3, arg4, arg5, callback) => callback());
    const promise = store.dispatch(wakeOnLan(mac));
    socket.emit('listening');
    return promise.then(() => {
        expect(socket.setBroadcast).toBeCalledWith(true);
        expect(socket.send.mock.calls.length).toBe(1);
        expect(socket.send.mock.calls[0].slice(0, 5)).toEqual([packet, 0, 102, 9, '255.255.255.255']);
    });
});

test('a failed wake on lan action due to a socket error', () => {
    const socket = new MockSocket();
    const store = mockStore({ });
    const mac = '12:34:56:78:9a:bc';
    const mockError = new Error();
    mockUdp.createSocket.mockReturnValue(socket);
    const promise = store.dispatch(wakeOnLan(mac));
    socket.emit('error', mockError);
    return promise.catch((error) => {
        expect(error).toBe(mockError);
        expect(socket.close).toBeCalledWith();
    });
});

test('a failed wake on lan action due to a send error', () => {
    const socket = new MockSocket();
    const store = mockStore({ });
    const mac = '12:34:56:78:9a:bc';
    const mockError = new Error('epic fail');
    mockUdp.createSocket.mockReturnValue(socket);
    socket.send.mockImplementation((arg1, arg2, arg3, arg4, arg5, callback) => callback(mockError));
    const promise = store.dispatch(wakeOnLan(mac));
    return promise.catch((error) => {
        expect(error).toBe(mockError);
    });
});

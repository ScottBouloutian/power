import dgram from 'react-native-udp';
import Promise from 'bluebird';

const wake = (mac) => {
    // Construct the magic packet
    const empty = new Uint8Array(102);
    empty.fill(255);
    const parts = mac.match(/[0-9a-fA-F]{2}/g);
    const macBytes = parts.map(part => parseInt(part, 16));
    const packet = empty.map((value, index) => (
        (index < 6) ? value : macBytes[index % 6]
    ));

    // Send the magic packet
    const socket = dgram.createSocket('udp4');
    return new Promise((resolve, reject) => {
        socket.once('listening', () => {
            socket.setBroadcast(true);
        });
        socket.once('error', (error) => {
            socket.close();
            reject(error);
        });
        socket.send(packet, 0, packet.length, 9, '255.255.255.255', (error) => {
            socket.close();
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

export const WAKE_ON_LAN = 'WAKE_ON_LAN';
export const wakeOnLan = mac => dispatch => (
    dispatch({
        type: WAKE_ON_LAN,
        payload: wake(mac),
    })
);

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

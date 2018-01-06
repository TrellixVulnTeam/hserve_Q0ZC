/**
 * Created by Dninja on Dec 14 2017.
 */

const crypto = require('crypto');
const axios = require('axios');

const icoBenchPub = 'a0098218-aca9-4ad9-9eee-8b86faaec226';
const icoBenchSecret = '7c5b7e7a-e632-4b1e-83f0-1ef7dbc0cf4c';


//  exporting our main app
module.exports = function () {

    const privateKey    = '7c5b7e7a-e632-4b1e-83f0-1ef7dbc0cf4c';
    const publicKey = 'a0098218-aca9-4ad9-9eee-8b86faaec226';
    const apiUrl    = 'https://icobench.com/api/v1/';
    let ICObench = {};


    let _send = (url, data = '') => {


        let jsonData = JSON.stringify(data);
        let sig = crypto.createHmac('sha384', privateKey).update(jsonData).digest('base64');

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(jsonData),
                'X-ICObench-Key': publicKey,
                'X-ICObench-Sig': sig,
            }
        };

        return axios.post(apiUrl + url, jsonData, config).then(response => {
            return response.data;
        }).catch(error => {
            console.log('Request Error: ', error);
            return false;
        });

    };

    ICObench.getICOs = (type, data) => {
        return _send(`icos/${type}`, data);
    };

    ICObench.getICO = (icoId, data = '') => {
        return _send(`ico/${icoId}`, data);
    };

    ICObench.getOther = (type) => {
        return _send(`other/${type}`);
    };

    return ICObench;
};
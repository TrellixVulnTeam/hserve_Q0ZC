import axios from 'axios';
import firebase from 'firebase';
import icodata from './icodata';
import cryptodata from './cryptodata';


const controller = () => {

    // Sleep Function 

    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }

firebase.initializeApp({
    databaseURL: 'https://hackcoin-new.firebaseio.com/'
});

const ref = firebase.database().ref('data');

// Refresh ICOs 
const fetchICO = icodata();

const fetchCRYPTO = cryptodata();


}
export default controller;

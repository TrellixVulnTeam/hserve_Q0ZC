import axios from 'axios';
import firebase from 'firebase';

const cryptodata = () => {

    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }


const CoincapFront = axios.get(`http://coincap.io/front`)
.then( res => {
    console.log(`Coincap Front Refresh`);
    const Values = Object.values(res.data);

    Values.forEach(item => {

        const frontpage_ref = firebase.database().ref(`source/coins/${item.short}/front`);

        frontpage_ref.update(item);

        sleep(10);

        
    });
    
});


// Coincap - Priority 

const CoincapList = axios.get(`http://coincap.io/map`)
.then(res => { 
    
    const Values = Object.values(res.data);
    
    Values.forEach(item => {

        CoincapProfile(item.symbol);
        sleep(10);

        CoincapHistory(item.symbol);
        sleep(10);
   
   
    });
});

const CoincapProfile = (props) => {
    
    const fetch = axios.get(`http://coincap.io/page/${props}`)
    .then( res => {
        const Store =[];
        
        Store.push(res.data);
       
        Store.forEach(item => {

            const profile_ref = firebase.database().ref(`source/coins/${props}/market`);

            profile_ref.update(item);
        
       });

    });

}

const CoincapHistory = (props) => {
   
    const fetch_day = axios.get(`http://coincap.io/history/1day/${props}`)
    .then( res => {

        const Store = [];

        Store.push(res.data);

        Store.forEach(item =>{

            const hist_day = firebase.database().ref(`source/coins/${props}/history/daily`);
            
            hist_day.update(item);

        });

    }).catch( err => err );



}

// Compare Snapshot BTC & USD & ETH



    const CoinMarketCap = axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=0`)
    .then ( res => { 
        
        const Values = Object.values(res.data);

        Values.forEach(item => {

            const sort_ref = firebase.database().ref(`source/rank/${item.rank}`);
            const coin_ref = firebase.database().ref(`source/coins/${item.symbol}`);

            sort_ref.update(item);
            sleep(10);
            coin_ref.update(item);
            sleep(10);
        });

    });
    
}

export default cryptodata;
import axios from 'axios';
import firebase from 'firebase';

const icodata = () => {

    // Sleep Function 

    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }


const upcomingICO = axios.get(`https://api.icowatchlist.com/public/v1/upcoming`)
.then( res => { 
    console.log(`ICO Upcoming Refresh`);
    const Values = Object.values(res.data.ico.upcoming);

    const Keys = Object.keys(res.data.ico.upcoming);

    Values.forEach( item => {

        const itemName = item.name.replace(/[.]/g, '');
        
        const up_ref = firebase.database().ref(`source/ico/upcoming/${itemName}/`);
        
        sleep(10);
        up_ref.update(item);

        sleep(10);
        
    });

});


const liveICO = axios.get(`https://api.icowatchlist.com/public/v1/live`)
.then( res => { 
    console.log(`ICO Live Refresh`);
    const Values = Object.values(res.data.ico.live);

    const Keys = Object.keys(res.data.ico.live);

    Values.forEach( item => {

        const itemName = item.name.replace(/[.]/g, '');
        
        sleep(50);
        const live_ref = firebase.database().ref(`source/ico/live/${itemName}/`);

        live_ref.update(item);
   

    });

});


const finishedICO = axios.get(`https://api.icowatchlist.com/public/v1/finished`)
.then( res => {
    console.log(`ICO Finished Refresh`);
    const Values = Object.values(res.data.ico.finished);
    
    const Keys = Object.keys(res.data.ico.finished);
    
    Values.forEach(item => {
    
        const itemName = item.name.replace(/[.]/g, '');

        sleep(10);

        const coins_ref = firebase.database().ref(`source/coins/${item.coin_symbol}/ico/finished`);

        const byName_ref = firebase.database().ref(`source/ico/finished/byName/${itemName}`);

        const bySymbol_ref = firebase.database().ref(`source/ico/finished/bySymbol/${item.coin_symbol}`);

        coins_ref.update(item);
        sleep(10);
        byName_ref.update(item);
        sleep(10);
        bySymbol_ref.update(item);
        

    });

});

const ICObench = require('./icobench')();

const pNumber = 0;
const type = 'all';
var data = { page: pNumber };
const icoDB = [];

const icoMain = ICObench.getICOs(type, data).then(data => {
	const pCount = data.pages;
	for (var i = 0; i < pCount; i++) {
		const listData = [];
		var data = { page: i };

		ICObench.getICOs(type, data).then(data => {
			data.results.forEach(item => {
                
                const itemName = item.name.replace(/[.]/g, '');
                
                sleep(10);
                
                const main_ref = firebase.database().ref(`source/ico/main/${itemName}`);
                
                sleep(10);
                
                main_ref.update(item);

                sleep(10);

                ICObench.getICO(item.id)
                .then( data => {

                  const Store = [];

                  Store.push(data);

                  Store.forEach(item => {

                        const itemName = item.name.replace(/[.]/g, '');

                        const details_ref = firebase.database().ref(`source/ico/main/${itemName}/details`);

                        details_ref.update(item);


                    });  
                }).catch( err => err );
            });
           
		});
    }
    console.log('ICO Main Details Refreshed');
	console.log('ICO Main Refreshed');
});

}

export default icodata;
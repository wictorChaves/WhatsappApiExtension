/**
 * Created by wictor on 10/06/2018.
 */

var db;
var dataset;

function initDatabase() {
    console.debug('called initDatabase()');

    try {
        if (!window.openDatabase)
            alert('not supported');
        else
            db = openDatabase('WppWebApi', '1.0', 'DB to Whatsapp Web Api', 65536);
    } catch(e) {
        if (e == 2)
            alert('Invalid database version');
        else
            alert('Unknown error ' + e);
    }
}
/**
 * Created by wictor on 11/06/2018.
 */

function joinColumns(fields){
    var columns = [];
    Object.keys(fields).forEach(function(key) {
        columns.push(key + " " + fields[key]);
    });
    return columns.join(", ");
}

function createTableQuery(table, fields){
    return "CREATE TABLE IF NOT EXISTS " + table + " (" + joinColumns(fields) + ");";
}

function createTableIfNotExists() {
    console.debug('called createTableIfNotExists()');
    db.transaction(transactionFunction);
}

function transactionFunction(transaction)
{
    getTables().forEach(function(table) {
        transaction.executeSql(table, []);
    });
}

function getTables()
{
    var tables = [];

    tables.push(createTableQuery("last_msg", {
        'id': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'id_msg':'TEXT',
        'timestamp': 'TEXT'
    }));

    tables.push(createTableQuery("messages", {
        'id': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'json': 'TEXT'
    }));

    tables.push(createTableQuery("send_msg", {
        'id': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'contact':'TEXT',
        'message': 'TEXT'
    }));

    return tables;
}
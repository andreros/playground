'use strict';

var sqlite3 = require('sqlite3').verbose();

function initialize() {
    var db = new sqlite3.Database(config.database.test_path);
    db.serialize(function () {

        console.log('Initializing database...');
        console.log('config: ', config);

        db.run("CREATE TABLE lorem (info TEXT)");

        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }

        stmt.finalize();

        var rows = document.getElementById("database");
        db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            var item = document.createElement("li");
            item.textContent = "" + row.id + ": " + row.info;
            rows.appendChild(item);
        });
    });

    db.close();
}

/**
 * Method responsible for getting the PB Core 2.1 root elements.
 * @returns {jQuery Deferred promise} Promise
 */
function getPBCoreRootElements () {
    var db = new sqlite3.Database(config.database.path);
    var defer = $.Deferred();
    db.all("SELECT  e.* " +
        "FROM `element` as e " +
        "WHERE e.`id_element_type` = 1", function(err, rows) {
        defer.resolve(rows);
    });
    db.close();
    return defer.promise();
}

module.exports = {
    initialize: initialize,
    getPBCoreRootElements: getPBCoreRootElements
};

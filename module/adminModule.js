'use strict';

exports.login = ( conn, param ) => {
    let sql = 'select * from admin where email = ? and pwd = ?';
    return new promise(( resolve, reject ) => {
        conn.query(sql, param, ( err, rows )=>{
           err ? reject( err ) : resolve(rows); 
        });
    });
}

exports.adminlist = ( conn ) => {
    let sql = 'select * from admin';
    return new promise(( resolve, reject ) => {
        conn.query(sql, ( err, rows )=>{
           err ? reject( err ) : resolve(rows); 
        });
    });
}
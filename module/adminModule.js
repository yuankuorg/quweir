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

exports.adminadd = ( conn, param ) => {
    let sql = 'insert into admin values(default,?,?,1)';
    return new promise(( resolve, reject ) => {
        conn.query(sql, param, ( err )=>{
           err ? reject( err ) : resolve(); 
        });
    });
}

exports.admindel = ( conn, param ) => {
    let sql = 'delete from admin where aid = ?';
    return new promise(( resolve, reject ) => {
        conn.query(sql, param, ( err )=>{
           err ? reject( err ) : resolve(); 
        });
    });
}
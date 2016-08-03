'use strict';

var adminModule = require(`${rootPath}/module/adminModule.js`);
exports.login = ( req, res, next ) => {
    var conn;
    co(function* () {
        conn = yield pool.getConnectionAsync();
        let rows = yield adminModule.login(conn,[req.body.email,req.body.pwd]);
        conn.release();

        if( rows.length == 1 ) {
            req.session.login = rows[0];
            res.send(config.message.success).end();
        } else {
            res.send(config.message.login_err).end();
        }
    }).catch(( err )=>{
        conn.release();
        next(err);
    });
}

exports.logout = ( req, res, next ) => {
    delete req.session.login;
    res.send(config.message.success).end();
}

exports.index = ( req, res, next ) => {
    res.render('admin/adminindex.html',{user:req.session.login});
}

exports.adminlist = ( req, res, next ) => {
    var conn;
    co(function* (){
        conn = yield pool.getConnectionAsync();
        let rows = yield adminModule.adminlist(conn);
        conn.release();

        res.render('admin/adminlist.html',{admins:rows});
    }).catch(( err )=>{
        conn.release();
        next(err);
    });
}
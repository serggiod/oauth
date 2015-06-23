var mysql = require('mysql');

// Modulo de definicioon de entorno.
function environment(){

    /* Configurar variables. */
    var path  = '/var/www/serv/oauth';
    var host  = 'localhost';
    var port  = '8200';
    var proto = 'http';

    return {
        // Configuracion del servidor.
        path:path,
        host:host,
        port:port,
        proto:proto,
        url:proto+'://'+host+':'+port,
        mysql:{
            web:{
                user:'sdominguez',
                pass:'rjwfthw72x45',
                host:'localhost',
                name:'legislatura_web'            
            },
            jujuy:{
                user:'sdominguez',
                pass:'sergio2012',
                host:'192.168.0.3',
                name:'legislatura_jujuy'           
            }
        },

        // Cadenas de Expresiones Regulares.
        filters:{
            string:'[a-zA-Z0-9.,;: ]'
        },

        // Coneccion a Base de Datos: legislatura_web;
        dbWeb:function(){
            return mysql.createConnection({
                host:app.locals.server.mysql.web.host,
                user:app.locals.server.mysql.web.user,
                password:app.locals.server.mysql.web.pass
            });
        },

        // Coneccion a Base de Datos: legislatura_jujuy;
        dbJujuy:function(){
            return mysql.createConnection({
                host:app.locals.server.mysql.jujuy.host,
                user:app.locals.server.mysql.jujuy.user,
                password:app.locals.server.mysql.jujuy.pass
            });
        }

    };

};

module.exports = environment;
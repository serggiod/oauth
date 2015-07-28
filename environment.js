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

        // Cadenas de Expresiones Regulares.
        filters:{
            string:'[a-zA-Z0-9.,;: ]'
        },

        // URL´s de bases de datos.
        db:{
            urlWeb:'mysql://oauth_user:housered132222SJ45@localhost/legislatura_web',
            urlJujuy:'mysql://sdominguez:sergio2012@192.168.0.3/legislatura_jujuy'
        }
    };

};

module.exports = environment;
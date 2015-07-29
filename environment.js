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
            urlWeb:'mysql://usuario:password@localhost/basededatos',
            urlJujuy:'mysql://usuario:password@localhost/basededatos'
        }
    };

};

module.exports = environment;
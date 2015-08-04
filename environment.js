// Modulo de definicioon de entorno.
function environment(){

    return {

        port:8200,

        // Cadenas de Expresiones Regulares.
        filters:{
            string:'[a-zA-Z0-9]'
        },

        // URL´s de bases de datos.
        db:{
            urlWeb:'mysql://oauth_user:housered132222SJ45@localhost/legislatura_web',
            urlJujuy:'mysql://sdominguez:sergio2012@192.168.0.3/legislatura_jujuy'
        }
    };

};

module.exports = environment;
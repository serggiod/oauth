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
            urlWeb:'mysql://usuario:password@host/basededatos',
            urlJujuy:'mysql://usuario:password@host/basededatos'
        }
    };

};

module.exports = environment;
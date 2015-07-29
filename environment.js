// Modulo de definicioon de entorno.
function environment(){

    return {

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
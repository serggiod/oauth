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
            urlWeb:'servicio://usuario:password@host:puerto/basededatos',
            urlJujuy:'servicio://usuario:password@host:puerto/basededatos'
        }
    };

};

module.exports = environment;
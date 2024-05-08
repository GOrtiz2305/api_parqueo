const RegistroLogs = require('../../models/logs/RegistroLogs');

exports.crearRegistroLogs = async (req, res) => {
    try {
        let json = req.body;
        const jsonString = JSON.stringify(json);
        
        // Crear una instancia del modelo RegistroLogs
        const registro = new RegistroLogs({
            registro: jsonString, // Almacenar el JSON como texto
            registro_json: json // Almacenar el JSON directamente
        });

        // Guardar el registro en la base de datos
        const nuevoRegistro = await registro.save();

        // Si se guarda correctamente, actualizamos el estado en PostgreSQL a 1 (verdadero)
        await axios.post('http://localhost:3000/response', {
            id: nuevoRegistro.id, // Suponiendo que _id es el identificador
            estado: 1
        });

        // Respondemos con el registro guardado
        res.status(200).json(nuevoRegistro);
    } catch (error) {
        // Intentar actualizar el estado en PostgreSQL a 2 (infructuoso)
        if (req.body.id_registro) { // Asegúrate de que id_registro está en el cuerpo de la solicitud
            await axios.post('http://localhost:3000/response', {
                id: req.body.id,
                estado: 2
            }).catch(errorPostgres => {
                console.error("Error al actualizar el estado en PostgreSQL:", errorPostgres);
            });
        }
        // Si ocurre algún error, responder con un mensaje de error
        res.status(500).json({ error: error.message });
    }
};

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const RegistroLogsSchema = mongoose.Schema({
    registro: {
        type: String,
        required: true
    },
    registro_json: {
        type: Object, // Cambiado a String para almacenar el JSON como texto
        required: true
    },
    total: {
        type: Number, // Campo total
    },
    fecha_pagado: {
        type: Date, // Campo fecha_pagado
        default: Date.now()
    },
    correlativo: {
        type: String, // Campo correlativo
    },
    createdAt: {
        type: Date, // Campo createdAt
        default: Date.now()
    },
    estado: {
        type: String,
        trim: true,
        required: true,
        default: 'ACTIVO',
    }
});
RegistroLogsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RegistroLogs', RegistroLogsSchema, 'logs');
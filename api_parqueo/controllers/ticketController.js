'use strict'
const Sequelize = require('sequelize');
const db = require("../models");
const Tickets = db.tickets;
const moment = require('moment');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    find(req, res) {
        return Tickets.findAll()
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },

    findById(req, res) {
        let id = req.body.id
        return Tickets.findByPk(id)
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },

    create(req, res) {
        //Crear
        //extraer datos de req.body
        let datos = req.body //Serializar los datos
        const datos_ingreso = { //Objeto
            centro_comercial: datos.centro_comercial,
        };

        Tickets.create(datos_ingreso)
            .then(Tickets => {
                res.send(Tickets);
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al insertar' });
            });
    },

    /*create(req, res) {
      // Crear
      // Extraer datos de req.body
      let datos = req.body // Serializar los datos
      const datos_ingreso = { // Objeto
          centro_comercial: datos.centro_comercial,
          fecha: datos.fecha,
          numero_vehiculo: datos.numero_vehiculo,
          timestamp_entrada: datos.timestamp_entrada,
          estado: "PENDIENTE",
      };
  
      // Crear el registro en Sequelize
      Tickets.create(datos_ingreso)
      .then(async (Tickets) => {
          try {
              // Hacer una solicitud HTTP POST a la API de Mongoose
              await axios.post('http://localhost:3001/logs_crear', datos);
  
              // Enviar la respuesta de Sequelize
              res.send(Tickets);
          } catch (error) {
              console.error("Error al hacer la solicitud a la API de Mongoose:", error);
              res.status(500).json({ error: 'Error al insertar' });
          }
      })
      .catch(error => {
          console.log(error);
          return res.status(500).json({ error: 'Error al insertar' });
      });
  },*/

    // Método update en la aplicación que llama a la API de Mongoose
    update(req, res) {
        let datos = req.body;

        Tickets.update(
            {
                timestamp_salida: moment.now(),
                total_pagar: datos.total_pagar,
                estado: "Pagado",
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
            .then(async () => {
                try {
                    const fechaPagado = new Date(); // Usar new Date() para garantizar la fecha actual

                    // Preparar los datos para la API de Mongoose, asegurándose de que todos los campos requeridos estén presentes
                    const datosParaMongoose = {
                        correlativo: datos.id.toString(), // Convertir a string si es necesario
                        total: datos.total_pagar, // Asegurarse de que esto es un número
                        fecha_pagado: fechaPagado, // Fecha actual en formato correcto
                        registro: JSON.stringify(datos), // Convertir datos a string JSON para 'registro'
                        registro_json: datos, // Enviar el objeto JSON completo
                        estado: 'ACTIVO' // Estado predeterminado según esquema
                    };

                    // Hacer una solicitud HTTP POST a la API de Mongoose
                    await axios.post('http://localhost:3001/logs_crear', datosParaMongoose);

                    res.status(200).send('El ticket ha sido pagado exitosamente');
                } catch (error) {
                    console.error("Error al hacer la solicitud a la API de Mongoose:", error);
                    res.status(500).json({ error: 'Error al pagar y registrar en Mongoose' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: 'Error al pagar' });
            });
    },

    updateResponse(req, res) {
        //Actualizar
        let datos = req.body
        Tickets.update(
            { //En crudo
                timestamp_salida: moment.now(),
                total_pagar: datos.total_pagar,
                estado: "Pagado",
            },
            {
                where: {
                    id: datos.id
                }
            }
        )
            .then(Tickets => res.status(200).send('El ticket ha sido pagado exitosamente'))
            .catch(error => {
                console.log(error)
                return res.status(500).json({ error: 'Error al pagar' });
            });
    },

    async delete(req, res) {
        //Eliminar
        console.log(req.params.id)
        let id = req.params.id; //Serializamos el id
        try {
            //Busqueda de un objeto especifico por id
            const Tickets = await Tickets.findByPk(id);
            //evaluamos si el objeto trajo algo
            if (!Tickets) {
                return res.status(404).json({ error: 'Ticket no encontrado' });
            }
            //Si pasa este punto
            await Tickets.destroy();
            return res.json({ message: 'Ticket eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar Tickets:', error);
            return res.status(500).json({ error: 'Error al eliminar Tickets' });
        }
    },
};


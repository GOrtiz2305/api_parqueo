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
        // Recibe los datos del ticket de la solicitud
        const datosTicket = req.body;

        // Crea el ticket en la base de datos
        Ticket.create(datosTicket)
            .then(ticket => {
                res.json({ message: 'Ticket creado correctamente en la API2', ticket });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error al crear el ticket en la API2' });
            });
    }

};


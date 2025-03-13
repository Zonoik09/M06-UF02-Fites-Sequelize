/**
 * rutesUsuaris.js
 * Definició de les rutes relacionades amb els Usuaris
 */

const express = require('express');
const router = express.Router();
const UsuarisController = require('../controllers/UsuariController');

/**
 * @swagger
 * /api/usuaris:
 *   post:
 *     summary: Crea un nou usuari
 *     description: Crea un nou usuari amb les dades proporcionades
 *     tags: [usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - username
 *               - email
 *               - password
 *               - nom
 *               - idioma
 *             properties:
 *               user_id:
 *                 type: int
 *                 description: id
 *               username:
 *                 type: string
 *                 description: username
 *               email:
 *                 type: string
 *                 description: email
 *               password:
 *                 type: string
 *                 description: password
 *               nom:
 *                 type: string
 *                 description: nom
 *               idioma:
 *                 type: String
 *                 description: idioma
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 *       400:
 *         description: Les dades proporcionades no compleixen els requisits
 *       409:
 *         description: Ja existeix un usuari amb aquest nom d'usuari o email
 */
router.post('/', UsuarisController.crearUsuari);


/**
 * @swagger
 * /api/usuaris/comentaris/{id}:
 *   get:
 *     summary: Obté un vídeo per ID
 *     description: Retorna la informació detallada d'un vídeo específic
 *     tags: [usuaris]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuari
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: comentaris obtingut amb èxit
 *       404:
 *         description: usuari no trobat
 *       500:
 *         description: Error intern del servidor
 */
router.get('/comentaris/:id', UsuarisController.obtenirPerId);
module.exports = router;

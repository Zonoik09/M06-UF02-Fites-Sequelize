/**
 * UsuariController.js
 * Controlador per gestionar les operacions dels usuaris
 */

const { User, Valoracions, Comentaris } = require('../models');
const { logger } = require('../config/logger');


/**
 * Crea un nou usuari
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const crearUsuari = async (req, res, next) => {
    try {
      const { user_id, username, email, password, nom, idioma } = req.body;
  
      // Verificar si l'usuari ja existeix pel seu ID
      const usuarioExistente = await User.findByPk(user_id);
      if (usuarioExistente) {
        return res.status(409).json({
          ok: false,
          missatge: `Ja existeix un usuari amb l'ID: ${user_id}`
        });
      }

  
      // Crear el nou usuari
      const user = await User.create({ user_id, username, email, password, nom, idioma });
  
      res.status(201).json({
        ok: true,
        missatge: "Usuari creat amb èxit",
        resultat: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          nom: user.nom,
          data_registre: user.data_registre,
          idioma: user.idioma
        }
      });

      return res.status(409).json({
        ok: false,
        codi: "ERROR_DUPLICAT",
        missatge: "Ja existeix un usuari amb aquest nom d'usuari o email",
        detalls: [
          { camp: "username", error: "Aquest nom d'usuari ja està registrat" },
          { camp: "email", error: "Aquest email ja està registrat" }
        ]
      });
  
    } catch (error) {
      console.error('Error creant usuari:', error);
      next(error);
    }
  };

  /**
 * Obté un vídeo per ID
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
  const obtenirPerId = async (req, res, next) => {
    try {
        const { id } = req.params;
        logger.info(`Petició per obtenir comentaris de l'usuari amb ID: ${id}`);

        const usuari = await User.findByPk(id, {
            include: [{
                model: Comentaris,
                attributes: ["id", "video_id", "user_id", "comentari"]
            }]
        });

        if (!usuari) {
            return res.status(404).json({
                ok: false,
                missatge: `No s'ha trobat cap usuari amb l'ID: ${id}`
            });
        }

        res.status(200).json({
            ok: true,
            missatge: 'Comentaris obtinguts amb èxit',
            resultat: usuari
        });

    } catch (error) {
        logger.error(`Error obtenint comentaris de l'usuari amb ID ${req.params.id}:`, error);
        next(error);
    }
};
  

module.exports = {
  crearUsuari,
  obtenirPerId
};
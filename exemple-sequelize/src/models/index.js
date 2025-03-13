/**
 * index.js de models
 * Configuració de les relacions entre els models
 */

const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Youtuber = require('./Youtuber');
const PerfilYoutuber = require('./PerfilYoutuber');
const Video = require('./Video');
const Categoria = require('./Categoria');
const User = require("./usuaris");

// Definir el model VideosCategories que servirà com a taula d'unió
const VideosCategories = sequelize.define('VideosCategories', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Video,
      key: 'id'
    }
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'videos_categories',
  timestamps: false
});

const Comentaris = sequelize.define('Comentaris', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comentari: {
    type: DataTypes.STRING(40),
    allowNull: false,
  }
}, {
  tableName: 'comentaris',
});

const Valoracions = sequelize.define('Valoracions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  video_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valoracion: {
    type: DataTypes.STRING(10),
    allowNull: false,
  }
}, {
  tableName: 'valoracions',
});



// Relació 1:1 entre Youtuber i PerfilYoutuber
Youtuber.hasOne(PerfilYoutuber, { foreignKey: 'youtuber_id' });
PerfilYoutuber.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relació 1:N entre Youtuber i Video
Youtuber.hasMany(Video, { foreignKey: 'youtuber_id' });
Video.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relació N:M entre Video i Categoria
Video.belongsToMany(Categoria, { through: VideosCategories, foreignKey: 'video_id' });
Categoria.belongsToMany(Video, { through: VideosCategories, foreignKey: 'categoria_id' });

Video.hasMany(Comentaris, { foreignKey: 'video_id' });
User.hasMany(Comentaris, { foreignKey: 'user_id' });

Comentaris.belongsTo(Video, { foreignKey: 'video_id' });
Comentaris.belongsTo(User, { foreignKey: 'user_id' });


module.exports = {
  Youtuber,
  PerfilYoutuber,
  Video,
  Categoria,
  VideosCategories,
  Valoracions,
  Comentaris,
  User
};
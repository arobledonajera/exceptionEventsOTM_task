const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

let PDB_NAME =
  process.env.IS_BIMBO === 'true'
    ? process.env.PDB_NAME_BIMBO
    : process.env.PDB_NAME_BARCEL;
let PDB_USER =
  process.env.IS_BIMBO === 'true'
    ? process.env.PDB_USER_BIMBO
    : process.env.PDB_USER_BARCEL;
let PDB_PASS =
  process.env.IS_BIMBO === 'true'
    ? process.env.PDB_PASS_BIMBO
    : process.env.PDB_PASS_BARCEL;

const postgresSequelize = new Sequelize(PDB_NAME, PDB_USER, PDB_PASS, {
  host: process.env.PDB_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    timezone: process.env.DB_TIMEZONE,
  },
  pool: {
    max: 5,
    min: 0,
    // acquire: 100 * 1000,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

module.exports = {
  postgresSequelize,
  Sequelize,
  DataTypes,
  Op,
};

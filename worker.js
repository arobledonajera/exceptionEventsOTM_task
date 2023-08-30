const { CronJob } = require("cron"); // Instancio el paquete 'node-cron' // Instancio el paquete 'express'
const postgresDbHelper = require("./helpers/postgresDB.helper");
const {
  getExceptionEventIdService,
  getExceptionEventsEntriesDeparturesSer,
} = require("./services/exceptionEvents.service");
const {
  addExceptionEventsController,
  updExceptionEventIdCtr,
} = require("./controllers/exceptionEvents.controller");
const { CRONTIME_MAIN } = process.env;
const sendEmail = require("./services/sendEmail.service");


const startApp = async () => {
  try {
    console.log(`1.- Proceso empezado ${new Date().toLocaleString("en-US")}`);
    // Obtener el Id de las excepciones
    const exceptionEventId = await getExceptionEventIdService();
    console.log(`2.- Id Event: ${exceptionEventId}`);
    //Obtener excepciones a partir de el Id obtenido
    const exceptions = await getExceptionEventsEntriesDeparturesSer(
      exceptionEventId
    );
    console.log(`3.- Excepciones a procesar: ${exceptions.length}`);
    if (exceptions.length) {
      // * Insertar los Eventos
      await addExceptionEventsController(exceptions);
      // * Actualizar el exceptionId
      await updExceptionEventIdCtr(exceptions);
    }
    console.log(`4.- Proceso terminado ${new Date().toLocaleString("en-US")}`);
    return;
  } catch (error) {}
};

const mainTaskJob = new CronJob(CRONTIME_MAIN, async () => {
  mainTaskJob.stop();
  const startTask = await startApp();
  mainTaskJob.start();
});

const startTask = () => {
  postgresDbHelper.postgresSequelize
    .authenticate()
    .then(() => {
      mainTaskJob.start();
    })
    .catch((err) => {
      sendEmail(`Error executing the task; ${err.message}`);
      throw err;
    });
};

startTask();

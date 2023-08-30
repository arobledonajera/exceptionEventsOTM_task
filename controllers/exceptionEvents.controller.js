const _ = require("lodash");
const eachSeries = require('async/eachSeries');
const {
  addExceptionEventsService,
  updExceptionEventIdSer,
} = require("../services/exceptionEvents.service");

const addExceptionEventsController = async (exceptionEvents) => {
  try {
    const chunks = _.chunk(exceptionEvents, 3000);
    await eachSeries(chunks, async (chunk) => {
      await addExceptionEventsService(chunk);
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

const updExceptionEventIdCtr = async (exceptionsEvents) => {
  try {
    const exceptionEvent = exceptionsEvents[0];
    await updExceptionEventIdSer(exceptionEvent);
    return;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addExceptionEventsController,
  updExceptionEventIdCtr,
};

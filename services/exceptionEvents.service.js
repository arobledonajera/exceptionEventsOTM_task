const {
  getExceptionEventIdRepository,
  getExceptionEventsEntriesDeparturesRepository,
  addExceptionEventsRepository,
  updExceptionEventIdRep,
} = require("../repositories/exceptionEvents.repository");
const { cleanResponseExceptionEvents } = require("../utils/cleanResponseDb");

const getExceptionEventIdService = async () => {
  const response = await getExceptionEventIdRepository();
  const exceptionEventId =
    response.length > 0
      ? response[0].exception_event_id_task_sel.data[0].exceptionEventId
      : 0;

  return exceptionEventId;
};

const getExceptionEventsEntriesDeparturesSer = async (exceptionEventId) => {
  const resp = await getExceptionEventsEntriesDeparturesRepository(
    exceptionEventId
  );
  const cleanResp = cleanResponseExceptionEvents(resp);
  return cleanResp;
};

const addExceptionEventsService = async(exceptionEvents) => {
    try {
        const resp = await addExceptionEventsRepository(exceptionEvents);
        return resp;
    } catch (error) {
        throw error;
    }
}

const updExceptionEventIdSer = async ({ id }) => {
  const resp = await updExceptionEventIdRep(id);
  return resp;
};

module.exports = {
  getExceptionEventIdService,
  getExceptionEventsEntriesDeparturesSer,
  addExceptionEventsService,
  updExceptionEventIdSer,
};

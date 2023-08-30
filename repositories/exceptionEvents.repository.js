const { executePostgresQuery } = require("../utils/queryGenerator");
require('dotenv').config();

let EVENTS_LIMIT = Number(process.env.EVENTS_LIMIT);

const getExceptionEventIdRepository = async () => {
  try {
    const query = `select exception_event_id_task_sel();`;
    const result = await executePostgresQuery(query, {}, false);
    return result;
  } catch (err) {
    throw err;
  }
};

const getExceptionEventsEntriesDeparturesRepository = async (_id_search) => {
  try {
    const query = `select exceptionevents_task_sel(:_id_search);`;
    const result = await executePostgresQuery(
      query,
      {
        _id_search,
      },
      false
    );
    return result.slice(-EVENTS_LIMIT);
  } catch (error) {
    throw error;
  }
};

//exception_events_task_exists_ins_json_fn

const addExceptionEventsRepository = async(_data) => {
    try {
        const query = `select exception_events_task_exists_ins_json_fn(:_data);`
        const result = await executePostgresQuery( 
            query,
            {
                _data: JSON.stringify(_data),
            },
            false
        );
        return result;
    } catch (error) {
        console.log('Error insertando data a: "exception_events_task_exists_ins_fn"');
    }
}

const updExceptionEventIdRep = async (_exception_id) => {
    try {
      const query = `select exception_event_id_task_upd(:_exception_id);`;
      const result = await executePostgresQuery(query, { _exception_id }, false);
      return result;
    } catch (err) {
      throw err;
    }
  };

module.exports = {
  getExceptionEventIdRepository,
  getExceptionEventsEntriesDeparturesRepository,
  addExceptionEventsRepository,
  updExceptionEventIdRep
};

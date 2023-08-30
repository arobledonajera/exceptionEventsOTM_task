const { clean } = require("./cleanFunctions");

const cleanResponseExceptionEvents = (arrayToClean) => {
  let cleanResponseArray = [];

  for (const item of arrayToClean) {
    const properties = clean(item, "exceptionevents_task_sel");

    const exceptionEvent = {
        id: Number(properties[0]),
        geotabId : properties[1],
        activeFrom : properties[2],
        activeTo: properties[3],
        deviceId : properties[4],
        distance: Number(properties[5]),
        driverId : properties[6],
        durationTicks: Number(properties[7]),
        lastModifiedDateTime  : properties[8],
        ruleId : properties[9],
        state : Number(properties[10]),
        version  : Number(properties[11]),
        recordLastChangedUtc: properties[12],
    };
    cleanResponseArray.push(exceptionEvent);
  }

  return cleanResponseArray;
};

module.exports = {
  cleanResponseExceptionEvents,
};

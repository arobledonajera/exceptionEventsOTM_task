const clean = (objectToClean, nameProp) => {
  const cleanString = objectToClean[nameProp].slice(1, -1);
  const components = cleanString.split(",");

  const properties = components.map((component) => {
    if (component.startsWith('"') && component.endsWith('"')) {
      return component.slice(1, -1);
    }
    return component;
  });

  return properties;
};

module.exports = {
  clean,
};

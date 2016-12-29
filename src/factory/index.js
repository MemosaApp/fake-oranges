export default (originalSchema) => {
  const generateSchema = (schema, iteration) => {
    if (schema !== null && typeof schema === 'object') {
      const keyPairs = {};

      Object.keys(schema).forEach(key => {
        keyPairs[key] = generateSchema(schema[key], iteration);
      });

      return keyPairs;
    } else if (typeof schema === 'function') {
      return schema(iteration);
    } else {
      return schema;
    }
  };

  return {
    generate(amount) {
      return Array.from(Array(amount).keys()).map(i => {
        return generateSchema(originalSchema, i);
      });
    },
  };
};

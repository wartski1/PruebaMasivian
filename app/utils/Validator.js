const Ajv = require('ajv');
const { BadRequestError } = require('./ErrorHandlerMiddleware');

const ajv = new Ajv({ removeAdditional: true, coerceTypes: true });

module.exports = (schema) => {
  const compiler = ajv.compile(schema);
  const validator = {
    validate: data => compiler(data),
    getError: () => compiler.errors,
    formatError() {
      const validationError = compiler.errors[0];
      const { message, dataPath } = validationError;

      return `${dataPath ? `${dataPath.replace('.', '')} ` : ''}${message.replace('.', '')}`;
    },
    validateRequest(payload) {
      const isValid = compiler(payload);
      if (!isValid) {
        const error = new BadRequestError(this.formatError());
        console.error(`ERROR: with payload ${JSON.stringify(payload)} -- ${error.message}`);
        throw error;
      }

      return isValid;
    },
  };

  return validator;
};

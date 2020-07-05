
module.exports = {
  title: 'ErrorResponse',
  type: 'object',
  properties: {
    error: {
      type: 'Object',
      properties: {
        message: {
          type: 'string',
        },
        code: {
          type: 'integer',
        },
      },
    },
  },
};

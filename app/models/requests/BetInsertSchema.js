module.exports = {
  title: 'BetInsert',
  type: 'object',
  properties: {
    value: {
      type: 'string',
    },
    amount: {
      type: 'integer',
    },
  },
  required: ['value', 'amount'],
};

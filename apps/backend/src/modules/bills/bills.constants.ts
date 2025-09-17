// TODO: Don't hardcode these values as they will change for test and production environments. Take api response a the source of truth
const airtimePaycodesMap = {
  mtn: '10903',
  glo: '40201',
  airtel: '10803',
  '9mobile': '12002',
};

// TODO: Don't hardcode these values as they will change for test and production environments. Take api as the source of truth
const dataPaymentItemsMap = {
  mtn: '4444',
  airtel: '687',
  glo: '15944',
  // '9mobile': 0 not available in test
};

export { airtimePaycodesMap, dataPaymentItemsMap };

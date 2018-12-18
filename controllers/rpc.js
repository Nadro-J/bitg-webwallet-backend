const { toBoolean } = require('../modules/utils');
const config = require('../config');
const client = config.rpcClient;

exports.sendrawtransaction = (req, res) => {
  const raw = req.body.raw;
  const allowhighfees = toBoolean(req.body.allowhighfees);
  const swifttx = toBoolean(req.body.swifttx);

  console.log('============ raw, allowhighfees, swifttx ============', raw, allowhighfees, swifttx);
  if (!raw) return res.status(400).send({ result: 'error', message: 'Empty raw data!' });

  try {
    return client.call('sendrawtransaction', [raw, allowhighfees, swifttx], (err, result) => {
      console.log('============ err, result ============', err, result);
      if (err) return res.status(400).send({ result: 'error', message: 'Error occured while sending raw transaction', error: err.error });
      return res.status(200).send({ result: 'ok', data: result });
    });
  } catch (error) {
    return res.status(400).send({ result: 'error', message: 'Rpc call error', error });
  }
};

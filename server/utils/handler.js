function send(res, rn, data, msg) {
  res.status(200).json({
    no: rn,
    data: data,
    msg: msg
  })
};

function handleError(res, rn, msg) {
  send(res, rn, null, msg);
};

module.exports = {
  send: send,
  handleError: handleError
};

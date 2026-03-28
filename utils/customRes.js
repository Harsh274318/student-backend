export default function customRes(res, status, success, message, err, data) {
  res.status(status).json({
    success,
    message,
    err,
    data,
  });
}

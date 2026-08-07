export const errorHandler = (res, statusCode, msg) => {
  return res.status(statusCode).json({ message: msg });
};

export const successHandler = (res, statusCode, msg, data) => {
  if (data) return res.status(statusCode).json({ message: msg, data: data });

  return res.status(statusCode).json({ message: msg });
};

const {ErrorHandler} = require('../../errors');
const {
  fileMimeTypeEnum: {MAX_PHOTO_SIZE, PHOTO_MIMETYPES},
  responseCustomErrorEnum: {NOT_VALID},
  responseStatusCodeEnum: {BAD_REQUEST}
} = require('../../constants');


module.exports = (req, res, next) => {
  req.photos = [];

  if (!req.files) return next();

  const files = Object.values(req.files);

  for (const file of files) {
    const {size, mimetype} = file;

    if (PHOTO_MIMETYPES.includes(mimetype)) {

      if (size > MAX_PHOTO_SIZE) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));

      req.photos.push(file);
    } else {
      return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));
    }
  }

  next();
}

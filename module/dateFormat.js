const dateFormat = (time) => {
  return time.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};
module.exports = dateFormat;

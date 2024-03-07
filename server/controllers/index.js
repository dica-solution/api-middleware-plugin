"use strict";

const ocrController = require("./ocr-controller");
const healthCheckController = require("./healthcheck-controller");
const buildLinkController = require('./buildLink-controller');
module.exports = {
  ocrController,
  healthCheckController,
  buildLinkController
};

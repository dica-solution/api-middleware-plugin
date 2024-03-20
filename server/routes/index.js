module.exports = [
  {
    method: "POST",
    path: "/ocr",
    handler: "ocrController.ocr",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/healthCheck",
    handler: "healthCheckController.healthCheck",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/healthCheckOCR",
    handler: "healthCheckController.healthCheckOCR",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/build-link/:id",
    handler: "buildLinkController.buildLinkById",
  },
];

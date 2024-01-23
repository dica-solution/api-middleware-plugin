module.exports = [
  {
    method: "POST",
    path: "/ocr",
    handler: "ocrController.ocr",
    config: {
      policies: [],
    },
  },
];

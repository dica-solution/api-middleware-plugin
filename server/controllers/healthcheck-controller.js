module.exports = ({strapi}) => ({
  async healthCheck() {
    return fetch(`${process.env.OCR_URL}/api/v1/hello`)
      .then((resp) => resp.json())
      .catch((error) => error);
  },

  async healthCheckOCR(ctx) {
    const url =
      "https://docdn.giainhanh.io/media/test/9b467d034383bcf831fe3a2aed55cdbc.png";
    return strapi
      .plugin("api-middleware-plugin")
      .service("ocrService")
      .handleOCR(url, ctx);
  },
});

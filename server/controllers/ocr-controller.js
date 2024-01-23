"use strict";

module.exports = ({strapi}) => ({
  ocr(ctx) {
    const {url = ""} = ctx.request.body;

    if (!url) {
      return ctx.send(
        {detail: "there is no uploaded file associated with the given key"},
        500
      );
    }

    return strapi
      .plugin("api-middleware-plugin")
      .service("ocrService")
      .handleOCR(url, ctx);
  },
});

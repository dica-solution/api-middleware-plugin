"use strict";

const _sendFormData = (strapi, ctx, imageOCRUrl, formData, isSave) => {
  let ocrURL = `${process.env.OCR_URL}/api/v1/analyze`;

  if (process.env.OCR_QUERY) {
    ocrURL += process.env.OCR_QUERY;
  }

  return fetch(ocrURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          ctx.send({...errorData}, response.status);
        });
      }
      return response.json();
    })
    .then((data) => {
      let mathText = data.math_text.data;

      mathText = mathText
        .replaceAll("<", "\\lt ")
        .replace(">", "\\gt ")
        .replace(/\\\((.*?)\\\)/gs, '<span class="math-tex">\\($1\\)</span>')
        .replace(/\\\[(.*?)\\\]/gs, '<span class="math-tex">\\[$1\\]</span>');

      const dataToSave = {url: imageOCRUrl, response: data};
      if (isSave) {
        if (mathText.trim()) {
          //save to db for data analysis
          strapi.db.query("api::ocr-log.ocr-log").create({
            data: {
              ...dataToSave,
            },
          });
        }
      }

      return {data: mathText, ...dataToSave};
    })
    .catch((error) => {
      ctx.send({detail: error}, 500);
    });
};

const _downloadImage = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error downloading image. Status: ${response.status} `);
    }
    return await response.blob();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = ({strapi}) => ({
  async handleOCR(url, ctx, isSave = true) {
    return _downloadImage(url)
      .then((blob) => {
        const formData = new FormData();
        formData.append("file", blob, "image.jpg");

        return _sendFormData(strapi, ctx, url, formData, isSave);
      })
      .catch((error) => {
        ctx.send({detail: error.message}, 500);
      });
  },
});

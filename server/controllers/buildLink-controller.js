const Hashids = require("hashids");

module.exports = ({strapi}) => ({
  async buildLinkById(ctx) {
    const {id} = ctx.params;
    const hashids = new Hashids(process.env.HASH_ID_URL_SALT, 7);
    const endCodeId = hashids.encodeHex(id);
    return {endCodeId};
  },
});

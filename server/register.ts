import { Strapi } from "@strapi/strapi";
import pluginId from '../admin/src/pluginId';

export default ({ strapi }: { strapi: Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "bootstrap-icon",
    plugin: pluginId,
    type: "string",
  });

};

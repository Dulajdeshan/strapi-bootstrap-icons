import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  const service = strapi.plugin("strapi-bootstrap-icons").service("service");
  if (strapi.db) {
    strapi.db.lifecycles.subscribe({
      afterFindMany(event) {
        event = service.manipulateFindMany(event);
      },
      afterFindOne(event) {
        event = service.manipulateFindOne(event);
      },
    });
  }
};

import bootstrap from "../server/bootstrap";

const strapi = {
  db: {
    lifecycles: {
      subscribe: jest.fn(),
    },
  },
  plugin: (plugin) => ({
    service: (serviceName) => ({}),
  })
};

describe("bootstrap", () => {
  it("should subscribe to lifecycles for models that have uuid fields", () => {
    bootstrap({ strapi });
    expect(strapi.db.lifecycles.subscribe).toHaveBeenCalledTimes(1);
    expect(strapi.db.lifecycles.subscribe).toHaveBeenCalledWith({
      afterFindMany: expect.any(Function),
      afterFindOne: expect.any(Function),
    });
  });
});

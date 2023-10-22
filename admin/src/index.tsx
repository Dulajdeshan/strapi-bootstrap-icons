import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import getTrad from "./utils/getTrad";
import ThumbIcon from "./components/ThumbIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: "bootstrap-icon",
      pluginId,
      type: "string",
      intlLabel: {
        id: getTrad("form.label"),
        defaultMessage: name,
      },
      intlDescription: {
        id: getTrad("form.description"),
        defaultMessage: "Use Official Bootstrap Icons",
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-bootstrap-icon" */ "./components/Input"
          ),
      },
      options: {
        base: [
          {
            intlLabel: {
              id: getTrad("form.field.responseFormat"),
              defaultMessage: "Response Format",
            },
            description: {
              id: "form.field.responseFormat.description",
              defaultMessage: "Field value format in the API response",
            },
            name: "options.response-format",
            type: "select",
            value: "base64",
            options: [
              {
                key: "base64",
                value: "base64",
                metadatas: {
                  intlLabel: {
                    id: getTrad("form.field.responseFormat.base64"),
                    defaultMessage: "Base64",
                  },
                },
              },
              {
                key: "svg",
                value: "svg",
                metadatas: {
                  intlLabel: {
                    id: getTrad("form.field.responseFormat.svg"),
                    defaultMessage: "SVG",
                  },
                },
              },
              {
                key: "class",
                defaultValue: "class",
                value: "class",
                metadatas: {
                  intlLabel: {
                    id: getTrad("form.field.responseFormat.class"),
                    defaultMessage: "CSS Class",
                  },
                },
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id:  getTrad('form.attribute.item.required'),
                  defaultMessage: 'Required field',
                },
                description: {
                  id:  getTrad('form.attribute.item.required.description'),
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
      validator: () => {},
    }),
      app.addMenuLink({
        to: `/plugins/${pluginId}`,
        icon: ThumbIcon,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: name,
        },
        Component: async () => {
          const component = await import(
            /* webpackChunkName: "[request]" */ "./pages/App"
          );

          return component;
        },
      });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

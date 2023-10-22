import { Strapi } from "@strapi/strapi";
import fs from "fs";

// Helpers
const getFieldMetadata = (attributes) => {
  const fieldAttributes = {};
  const fields = Object.keys(attributes).filter((item) => {
    return (
      attributes[item].customField ===
      "plugin::strapi-bootstrap-icons.bootstrap-icon"
    );
  });
  fields.forEach((item) => {
    fieldAttributes[item] = attributes[item];
  });

  return { fields, fieldAttributes };
};

const getIconBuffer = (value: string) => {
  try {
    const icon = fs.readFileSync(
      require.resolve(`bootstrap-icons/icons/${value}.svg`)
    );
    return icon;
  } catch (err) {
    return null;
  }
};

const getIconResponseValue = (value: string, format?: string) => {
  if (format === "class") {
    return value;
  } else {
    const buffer = getIconBuffer(value);
    if (buffer) {
      if (format === "svg") {
        return buffer.toString("utf8").replace(/(\r\n|\n|\r)/gm, "");
      }
      return `data:image/svg+xml;base64,${buffer.toString("base64")}`;
    }
    return value;
  }
};

export default ({ strapi }: { strapi: Strapi }) => ({
  manipulateFindOne(objs) {
    if (objs?.result) {
      const attributes = objs?.model?.attributes;
      if (attributes) {
        const result = objs.result;
        const { fields, fieldAttributes } = getFieldMetadata(attributes);
        if (fields.length > 0) {
          fields.forEach((item) => {
            if (!result["updatedBy"] && result[item] !== undefined) {
              const fieldOptions = fieldAttributes[item]?.options;
              const format = fieldOptions
                ? fieldOptions["response-format"]
                : "base64";
              const value = getIconResponseValue(result[item], format);
              result[item] = value;
            }
          });
        }
      }
    }
  },
  manipulateFindMany(objs) {
    if (objs?.result?.length > 0) {
      const attributes = objs?.model?.attributes;
      if (attributes) {
        const results = objs.result;
        const { fields, fieldAttributes } = getFieldMetadata(attributes);
        if (fields.length > 0) {
          fields.forEach((item) => {
            results.forEach(async (result) => {
              if (!result["updatedBy"] && result[item] !== undefined) {
                const fieldOptions = fieldAttributes[item]?.options;
                const format = fieldOptions
                  ? fieldOptions["response-format"]
                  : "base64";
                const value = getIconResponseValue(result[item], format);
                result[item] = value;
              }
            });
          });
        }
      }
    }
  },
});

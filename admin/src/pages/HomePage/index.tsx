/*
 *
 * HomePage
 *
 */

import React, { useMemo, useState } from "react";
import {
  Layout,
  HeaderLayout,
  ContentLayout,
  Flex,
  IconButton,
  Tooltip,
  SearchForm,
  Searchbar,
  Typography
} from "@strapi/design-system";
import { useIntl } from "react-intl";
import pluginId from "../../pluginId";
import "bootstrap-icons/font/bootstrap-icons.css";
import iconList from "bootstrap-icons/font/bootstrap-icons.json";
import getTrad from "../../utils/getTrad";

const HomePage = () => {
  const { formatMessage } = useIntl();

  const [searchQuery, setSearchQuery] = useState("");

  const totalIcons = useMemo(() => Object.keys(iconList).length, [iconList]);

  const filteredIconList = useMemo(
    () =>
      Object.keys(iconList).filter((item) => {
        return item.includes(searchQuery.toLowerCase());
      }),
    [iconList, searchQuery]
  );

  const title = formatMessage({
    id: getTrad("plugin.name"),
    defaultMessage: "Content Types Builder",
  });

  return (
    <Layout
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <HeaderLayout
        title={title}
        as="h2"
        subtitle={formatMessage(
          {
            id: getTrad("total.icons"),
            defaultMessage: "Total {total} icons",
          },
          {
            total: totalIcons,
          }
        )}
      />

      <ContentLayout>
        <Flex gap={2} style={{ marginBottom: "20px" }}>
          <SearchForm>
            <Searchbar
              name="searchbar"
              onClear={() => setSearchQuery("")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={formatMessage({
                id: getTrad("search.placeholder"),
                defaultMessage: "Search icons",
              })}
            />
          </SearchForm>
        </Flex>
        <Flex background="neutral100" gap={2} wrap="wrap">
          {filteredIconList.map((item) => (
            <Tooltip description={item}>
              <IconButton
                aria-label="Edit"
                style={{ width: "inherit", height: "inherit" }}
              >
                <Typography className={`icon bi-${item}`} style={{ fontSize: 24 }}></Typography>
              </IconButton>
            </Tooltip>
          ))}
        </Flex>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;

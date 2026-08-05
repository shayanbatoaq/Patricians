import "server-only";

import {
  Client,
  APIErrorCode,
  isFullDataSource,
  isFullDatabase,
} from "@notionhq/client";
import type { DataSourceObjectResponse } from "@notionhq/client";

import type { NotionPropertySchema } from "@/types/notion";
export { isRetryableNotionError, withNotionRetry } from "@/lib/notionRetry";
import { withNotionRetry } from "@/lib/notionRetry";

export type NotionDataSourceConfig = {
  id: string;
  schema: NotionPropertySchema;
  raw: DataSourceObjectResponse;
};

let client: Client | null = null;
let dataSourcePromise: Promise<NotionDataSourceConfig> | null = null;

export function getNotionClient() {
  if (client) {
    return client;
  }

  const token = process.env.NOTION_TOKEN?.trim();
  if (!token) {
    throw new Error("NOTION_TOKEN is not configured.");
  }

  client = new Client({
    auth: token,
    notionVersion: "2026-03-11",
    timeoutMs: 20_000,
    retry: false,
    logger: (_level, message) => console.warn(`[Notion] ${message}`),
  });

  return client;
}

function toSchema(dataSource: DataSourceObjectResponse): NotionPropertySchema {
  return Object.fromEntries(
    Object.entries(dataSource.properties).map(([name, property]) => [
      name,
      { id: property.id, name, type: property.type },
    ]),
  );
}

async function resolveDataSource(): Promise<NotionDataSourceConfig> {
  const configuredId = process.env.NOTION_PAT_AI_DATABASE_ID?.trim();
  if (!configuredId) {
    throw new Error("NOTION_PAT_AI_DATABASE_ID is not configured.");
  }

  const notion = getNotionClient();

  try {
    const directSource = await withNotionRetry(() =>
      notion.dataSources.retrieve({ data_source_id: configuredId }),
    );

    if (isFullDataSource(directSource)) {
      return { id: directSource.id, schema: toSchema(directSource), raw: directSource };
    }
  } catch (error) {
    if (
      !(
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === APIErrorCode.ObjectNotFound
      )
    ) {
      throw error;
    }
  }

  const database = await withNotionRetry(() =>
    notion.databases.retrieve({ database_id: configuredId }),
  );
  if (!isFullDatabase(database) || database.data_sources.length === 0) {
    throw new Error("The configured Notion database has no accessible data source.");
  }

  const preferred =
    database.data_sources.find((source) => /pat ai conversations/i.test(source.name)) ??
    database.data_sources[0];
  const dataSource = await withNotionRetry(() =>
    notion.dataSources.retrieve({ data_source_id: preferred.id }),
  );

  if (!isFullDataSource(dataSource)) {
    throw new Error("Notion returned a partial data source without its property schema.");
  }

  return { id: dataSource.id, schema: toSchema(dataSource), raw: dataSource };
}

export function getNotionDataSource() {
  dataSourcePromise ??= resolveDataSource().catch((error) => {
    dataSourcePromise = null;
    throw error;
  });

  return dataSourcePromise;
}

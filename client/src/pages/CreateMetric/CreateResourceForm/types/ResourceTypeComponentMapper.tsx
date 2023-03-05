import { ResourceType } from "@prisma/client";
import React from "react";
import { ReactNode } from "react";
import { CassandraConnectionForm } from "../connectionForms/CassandraConnectionForm";
import { PostgresConnectionForm } from "../connectionForms/PostgresConnectionForm";
import { SageConnectionForm } from "../connectionForms/SageConnectionForm";

export const ResourceTypeComponentMapper: Record<ResourceType, ReactNode> = {
    [ResourceType.Cassandra]: <CassandraConnectionForm />,
    [ResourceType.Postgres]: <PostgresConnectionForm />,
    [ResourceType.Sage]: <SageConnectionForm />,
};

import React, { ReactNode } from "react";
import { CassandraConnectionForm } from "../connectionForms/CassandraConnectionForm";
import { PostgresConnectionForm } from "../connectionForms/PostgresConnectionForm";
import { SageConnectionForm } from "../connectionForms/SageConnectionForm";
import { ResourceType } from "../../../../../../common/types/ResourceType";

export const ResourceTypeComponentMapper: Record<ResourceType, ReactNode> = {
    [ResourceType.Cassandra]: <CassandraConnectionForm />,
    [ResourceType.Postgres]: <PostgresConnectionForm />,
    [ResourceType.Sage]: <SageConnectionForm />,
};

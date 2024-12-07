"use client";

import { ApplicationColumn, columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { getApplicationStatusLabel } from "@/lib/utils";
import { ApplicationStatus } from "@prisma/client";

interface ApplicationsClientProps {
  data: ApplicationColumn[];
}

export default function ApplicationsClient({ data }: ApplicationsClientProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKeys={["name"]}
      filters={[
        {
          column: "status",
          // options: areas.map((area) => ({
          //   value: area.name,
          //   label: area.name,
          // })),
          options: Object.keys(ApplicationStatus).map((status) => ({
            value: status,
            label: getApplicationStatusLabel(status as ApplicationStatus),
          })),
        },
      ]}
      // filters={[
      //   {
      //     column: "role",
      //     options: Object.keys(UserRole).map((role) => ({
      //       value: role,
      //       label: role,
      //     }));

      //   },
      // ]}
    />
  );
}

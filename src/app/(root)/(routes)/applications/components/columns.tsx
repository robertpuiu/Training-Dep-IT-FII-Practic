"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { ApplicationStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { getApplicationStatusLabel } from "@/lib/utils";

export type ApplicationColumn = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  lastStatusChange: string;
  status: ApplicationStatus;
};

export const columns: ColumnDef<ApplicationColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Applied At",
  },
  {
    accessorKey: "lastStatusChange",
    header: "Last Status Change",
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const formattedStatus = getApplicationStatusLabel(row.original.status);
      switch (row.original.status) {
        case ApplicationStatus.PENDING:
          return (
            <Badge className="whitespace-nowrap bg-yellow-100 font-bold text-yellow-600">
              {formattedStatus}
            </Badge>
          );
        case ApplicationStatus.ACCEPTED:
          return (
            <Badge className="whitespace-nowrap bg-green-200 font-bold text-green-600">
              {formattedStatus}
            </Badge>
          );
        case ApplicationStatus.NOT_ATTENDING:
        case ApplicationStatus.REJECTED:
          return (
            <Badge className="whitespace-nowrap bg-red-200 font-bold text-red-600">
              {formattedStatus}
            </Badge>
          );
        case ApplicationStatus.ATTENDING:
          return (
            <Badge className="whitespace-nowrap bg-indigo-200 font-bold text-indigo-600">
              {formattedStatus}
            </Badge>
          );
        default:
          return (
            <Badge className="whitespace-nowrap font-semibold text-yellow-600">
              {formattedStatus}
            </Badge>
          );
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

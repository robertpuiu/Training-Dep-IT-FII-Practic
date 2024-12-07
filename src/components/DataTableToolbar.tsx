"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { Button } from "./ui/button";

interface Filters {
  column: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKeys?: string[];
  filters?: Filters[];
}

export function DataTableToolbar<TData>({
  table,
  searchKeys,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center space-x-2 ">
      {Array.isArray(searchKeys) ? (
        <>
          {searchKeys.map((searchKey) => (
            <div key={searchKey}>
              {/* <Label>{searchKey[0].toUpperCase() + searchKey.slice(1)}</Label> */}
              <Input
                placeholder={`Search ${searchKey}...`}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>
          ))}
        </>
      ) : null}

      {/* TODO: For this to work dont forget to add the "filterFn" to the column definition */}
      {Array.isArray(filters) ? (
        <>
          {filters.map((filter) => (
            <DataTableFacetedFilter
              key={filter.column}
              column={table.getColumn(filter.column)}
              title={filter.column[0].toUpperCase() + filter.column.slice(1)}
              options={filter.options}
            />
          ))}
        </>
      ) : null}
      {isFiltered && (
        <Button
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

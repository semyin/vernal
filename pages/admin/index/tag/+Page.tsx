import { useState } from "react";
import { Filters } from "#root/api/tag/type";
import { TagsFilter } from "./TagsFilter";
import { TagsTable } from "./TagsTable";

export { Page };

function Page() {
  const [filters, setFilters] = useState<Filters>({});

  function handleAdd() { }

  function handleSearch(values: Filters) {
    setFilters(values);
  }

  return (
    <>
      <TagsFilter onSearch={handleSearch} onAdd={handleAdd} />
      <TagsTable filters={filters} />
    </>
  )
}

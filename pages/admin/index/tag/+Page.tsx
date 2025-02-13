import { useState } from "react";
import { Filters } from "#root/api/tag/type";
import { TagsFilter } from "./TagsFilter";
import { TagsTable } from "./TagsTable";
import { TagModal } from "./TagModal";

export { Page };

function Page() {
  const [filters, setFilters] = useState<Filters>({});
  const [visible, setVisible] = useState(false)
  const [currentTagId, setCurrentTagId] = useState(0)
  const [currentTagName, setCurrentTagName] = useState("")

  function handleAdd() {
    setCurrentTagId(0)
    setCurrentTagName("")
    setVisible(true)
  }

  function handleSearch(values: Filters) {
    setFilters(values);
  }

  function handleEdit(id: number, name: string) {
    setCurrentTagId(id);
    setCurrentTagName(name)
    setVisible(true)
  }

  return (
    <>
      <TagsFilter
        onSearch={handleSearch}
        onAdd={handleAdd}
      />
      <TagsTable
        filters={filters}
        handleEdit={(id: number, name: string) => handleEdit(id, name)}
      />
      <TagModal
        visible={visible}
        onCancel={() => setVisible(false)}
        currentTagId={currentTagId}
        currentTagName={currentTagName}
      />
    </>
  )
}

import { useState } from "react";
import { Filters } from "#root/api/tag/type";
import { TagsFilter } from "./TagsFilter";
import { TagsTable } from "./TagsTable";
import { TagModal } from "./TagModal";

export { Page };

interface TagState {
  id: number;
  name: string;
}

function Page() {
  const [filters, setFilters] = useState<Filters>({});
  const [visible, setVisible] = useState(false)
  const [currentTag, setCurrentTag] = useState<TagState>({ id: 0, name: "" });

  const handleOpenModal = (id: number = 0, name: string = "") => {
    setCurrentTag({ id, name });
    setVisible(true);
  };

  function handleSearch(values: Filters) {
    setFilters(values);
  }

  return (
    <>
      <TagsFilter
        onSearch={handleSearch}
        onAdd={() => handleOpenModal()}
      />
      <TagsTable
        filters={filters}
        onEdit={handleOpenModal}
      />
      <TagModal
        visible={visible}
        onCancel={() => setVisible(false)}
        currentTagId={currentTag.id}
        currentTagName={currentTag.name}
      />
    </>
  )
}

export { Page };

import { useState } from "react";
import { FilesTable } from "./FilesTable";
import { FileModal } from "./FileModal";
import { fileFilters } from "#root/api/file/type";
import {
  FilterForm,
  FilterFormProps,
  FilterItemConfig
} from "#root/components/FilterForm/FilterForm";

function Page() {

  const [filters, setFilters] = useState<fileFilters>({});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const handleAdd = () => {

  }

  const filterItems: FilterItemConfig[] = [
    {
      type: 'input',
      name: 'name',
      placeholder: '请输入名称',
    }
  ]

  const handleSearch = (values: fileFilters) => {
    setFilters(values);
  };


  const filterFormProps: FilterFormProps<fileFilters> = {
    onFilter: handleSearch,
    filterItems: filterItems
  }


  return (
    <>
      <FilterForm {...filterFormProps} addText="上传" onAdd={handleAdd}/>
      <FilesTable
        filters={filters}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
      <FileModal />
    </>
  );
}

export { Page }

import { useState } from "react";
import { Meta, MetaFilters } from "#root/api/meta/type";
import { FilterForm, FilterFormProps, FilterItemConfig } from "#root/components/FilterForm/FilterForm"
import { MetaModal } from "./MetaModal";
import { MetasTable } from "./MetasTable";

function Page() {

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [filters, setFilters] = useState<MetaFilters>({});
  const [visible, setVisible] = useState(false)
  const [currenId, setCurrentId] = useState<number>()
  const handleSearch = (values: MetaFilters) => {
    setFilters(values);
  };

  const handleOpenModal = ({ id }: Partial<Meta>) => {
    setCurrentId(id)
    setVisible(true);
  }

  const handleAdd = () => {
    handleOpenModal({ id: 0, name: "", property: "", content: "" })
  }

  const filterItems: FilterItemConfig[] = [
    {
      type: 'input',
      name: 'name',
      placeholder: 'name',
    },
    {
      type: 'input',
      name: 'property',
      placeholder: 'property',
    },
    {
      type: 'booleanSelect',
      name: 'isDefault',
      style: { width: "120px" },
      placeholder: '是否站点值',
    },
    {
      type: "select",
      name: "resourceType",
      placeholder: "请选择资源类型",
      style: { width: "220px" },
      options: [{ label: "文章", value: "article" }],
    },
  ]

  const filterFormProps: FilterFormProps<MetaFilters> = {
    onFilter: handleSearch,
    onAdd: handleAdd,
    filterItems: filterItems
  }

  return <>
    <FilterForm {...filterFormProps} />
    <MetaModal
      visible={visible}
      currentId={currenId}
      onCancel={() => setVisible(false)}
    />
    <MetasTable
      page={page}
      limit={limit}
      setPage={setPage}
      setLimit={setLimit}
      filters={filters}
      onEdit={handleOpenModal}
    />
  </>
}

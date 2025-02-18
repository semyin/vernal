export { Page };

import { useState } from "react";
import { FriendLink, FriendLinkFilters } from "#root/api/friend-link/type"
import { FilterForm, FilterFormProps, FilterItemConfig } from "#root/components/FilterForm/FilterForm"
import { FriendLinksTable } from "./FriendLinksTable";
import { FriendLinkModal } from "./FriendLinkModal";

function Page() {
  const [filters, setFilters] = useState<FriendLinkFilters>({});
  const [visible, setVisible] = useState(false)
  const [currenId, setCurrentId] = useState<number>()
  const handleSearch = (values: FriendLinkFilters) => {
    setFilters(values);
  };

  const handleOpenModal = ({ id }: Partial<FriendLink>) => {
    setCurrentId(id)
    setVisible(true);
  }

  const handleAdd = () => {
    handleOpenModal({ id: 0, name: "", description: "" })
  }

  const filterItems: FilterItemConfig[] = [
    {
      type: 'input',
      name: 'name',
      placeholder: '请输入名称',
    },
    {
      type: 'booleanSelect',
      name: 'isVisible',
      style: { width: "120px" },
      placeholder: '是否可见',
    },
  ]

  const filterFormProps: FilterFormProps<FriendLinkFilters> = {
    onFilter: handleSearch,
    onAdd: handleAdd,
    filterItems: filterItems
  }

  return <>
    <FilterForm {...filterFormProps} />
    <FriendLinksTable
      filters={filters}
      onEdit={handleOpenModal}
    />
    <FriendLinkModal
      visible={visible}
      onCancel={() => setVisible(false)}
      currentId={currenId}
    />
  </>
}

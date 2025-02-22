export { Page };

import { useState } from "react";
import { User, UserFilters } from "#root/api/user/type";
import {
  FilterForm,
  FilterFormProps,
  FilterItemConfig
} from "#root/components/FilterForm/FilterForm"
import { UsersTable } from "./UsersTable";


function Page() {

  const [filters, setFilters] = useState<UserFilters>({});
  const [currenId, setCurrentId] = useState<number>()
  const [visible, setVisible] = useState(false)

  const handleSearch = (values: UserFilters) => {
    setFilters(values);
  };

  const handleOpenModal = ({ id }: Partial<User>) => {
    setCurrentId(id);
    setVisible(true);
  }

  const handleAdd = () => {
    handleOpenModal({ id: 0 })
  }

  const filterItems: FilterItemConfig[] = [
    {
      type: 'input',
      name: 'username',
      placeholder: '用户名',
    },
    {
      type: 'input',
      name: 'email',
      placeholder: '邮箱',
    },
    {
      type: 'input',
      name: 'phone',
      placeholder: '手机号',
    }
  ]

  const filterFormProps: FilterFormProps<UserFilters> = {
    onFilter: handleSearch,
    filterItems: filterItems
  }

  return <>
    <FilterForm {...filterFormProps} />
    <UsersTable
      filters={filters}
      onEdit={handleOpenModal}
    />
  </>
}

export { Page };

import { useState } from "react";
import { FilterForm, FilterItemConfig, FilterFormProps } from "#root/components/FilterForm/FilterForm";
import { Category, CategoryFilters } from "#root/api/category/type";
import { CategoriesTable } from "./CategoriesTable";
import { CategoryModal } from "./CategoryModal";

interface CategoryState {
  id?: number;
  name?: string;
  description?: string
}

function Page() {

  const [filters, setFilters] = useState<CategoryFilters>({});
  const [visible, setVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<CategoryState>({ id: 0, name: "", description: "" })

  const handleOpenModal = ({ id, name, description }: Partial<Category>) => {
    setCurrentCategory({ id, name, description })
    setVisible(true);
  }

  const handleSearch = (values: CategoryFilters) => {
    setFilters(values);
  };

  const handleAdd = () => {
    handleOpenModal({ id: 0, name: "", description: "" })
  }

  const filterItems: FilterItemConfig[] = [
    {
      type: 'input',
      name: 'name',
      placeholder: '请输入名称',
    }
  ]


  const filterFormProps: FilterFormProps<CategoryFilters> = {
    onFilter: handleSearch,
    onAdd: handleAdd,
    filterItems: filterItems
  }

  return <>
    <FilterForm {...filterFormProps} />
    <CategoriesTable filters={filters} onEdit={handleOpenModal} />
    <CategoryModal
      visible={visible}
      onCancel={() => setVisible(false)}
      currentId={currentCategory.id}
      currentName={currentCategory.name}
      currentDescription={currentCategory.description}
    />
  </>
};
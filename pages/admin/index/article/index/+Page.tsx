import { useState } from "react";
import { navigate } from "vike/client/router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArticleFilters } from "#root/api/article/type"
import { ArticlesTable } from "./ArticlesTable";
import { FilterForm, FilterItemConfig, FilterFormProps } from "#root/components/FilterForm/FilterForm";
import { fetchTags } from "#root/api/tag";
import { fetchCategories } from "#root/api/category";

function Page() {

  const { data: tags = [] } = useSuspenseQuery({
    queryKey: ["admin-tags"],
    queryFn: () => fetchTags(),
  });

  const { data: categories = [] } = useSuspenseQuery({
    queryKey: ["admin-categories"],
    queryFn: () => fetchCategories(),
  });

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [filters, setFilters] = useState<ArticleFilters>({});

  const handleSearch = (values: ArticleFilters) => {
    console.log(values);
    setFilters(values);
    setPage(1); // 重置页码为第一页
  };

  const handleAdd = () => {
    navigate("/admin/article/upsert");
  }

  const filterItems: FilterItemConfig[] = [
    {
      type: 'input',
      name: 'title',
      placeholder: '请输入标题',
    },
    {
      type: "multipleSelect",
      name: "tagIds",
      placeholder: "请选择标签",
      style: { width: "220px" },
      options: tags.map(tag => ({ label: tag.name, value: tag.id })),
    },
    {
      type: "multipleSelect",
      name: "categoryIds",
      placeholder: "请选择分类",
      style: { width: "220px" },
      options: categories.map(category => ({ label: category.name, value: category.id })),
    },
    {
      type: 'booleanSelect',
      name: 'isPublished',
      style: { width: "120px" },
      placeholder: '是否已发布',
    },
    {
      type: 'booleanSelect',
      name: 'isTop',
      style: { width: "120px" },
      placeholder: '是否置顶',
    },
    {
      type: 'rangePicker',
      name: 'dates',
      style: { width: "240px" },
    },
  ]

  const filterFormProps: FilterFormProps<ArticleFilters> = {
    onFilter: handleSearch,
    onAdd: handleAdd,
    filterItems: filterItems
  }

  return (
    <>
      <FilterForm {...filterFormProps} />
      <ArticlesTable
        page={page}
        limit={limit}
        filters={filters}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
}

export { Page };

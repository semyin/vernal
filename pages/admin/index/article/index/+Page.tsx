import { useState } from "react";
import { Filters, SearchForm } from "./SearchForm";
import { ArticlesTable } from "./ArticlesTable";

function Page() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [filters, setFilters] = useState<Filters>({});

  const handleSearch = (values: Filters) => {
    setFilters(values);
    setPage(1); // 重置页码为第一页
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
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

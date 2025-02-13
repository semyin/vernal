export { Page };

import { useState } from "react";
import { Filters } from "#root/api/category/type";
import { CategoriesTable } from "./CategoriesTable";

function Page() {

  const [filters, setFilters] = useState<Filters>({});

  const handleOpenModal = () => {}

  return <>
    <CategoriesTable filters={filters} onEdit={handleOpenModal} />
  </>
};
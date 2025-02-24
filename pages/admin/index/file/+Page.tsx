export { Page };

import { FilesTable } from "./FilesTable";
import { FileModal } from "./FileModal";

function Page() {
  return (
    <>
      <FilesTable />
      <FileModal />
    </>
  );
}

import { withFallback } from "vike-react-query";

const FilesTable = withFallback(() => {
  return <>files table</>;
});

export { FilesTable };

import { withFallback } from "vike-react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Table, TableColumnType } from "antd";
import { fetchSite, BASE_QUERY_KEY } from "#root/api/site-config";
import { Site } from "#root/api/site-config/type";
import { useMountedStyles } from "#root/hooks/useMountedStyles";

const columns = (
  onEdit: ({ id }: Site) => void,
): TableColumnType<Site>[] => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "站点名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "站点链接",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "站点描述",
      dataIndex: "description",
      key: "description",
      width: 400
    },
    {
      title: "版权信息",
      dataIndex: "copyright",
      key: "copyright",
    },
    {
      title: "ICP备案号",
      dataIndex: "icp",
      key: "descricpiption",
    },
    {
      title: "运行时间",
      dataIndex: "runTime",
      key: "runTime",
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 160,
      render: (_: unknown, record: Site) => (
        <div>
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
        </div>
      ),
    },
  ]

interface Props {
  onEdit: (data: Site) => void;
}

const SiteTable = withFallback(
  ({ onEdit }: Props) => {

    const queryKey = [BASE_QUERY_KEY];

    const result = useSuspenseQuery({
      queryKey,
      queryFn: () => fetchSite(),
    });

    const _s = useMountedStyles();

    return <Table
      style={_s}
      bordered
      loading={result.isFetching}
      dataSource={[result.data]}
      columns={columns(onEdit)}
      rowKey="id"
      scroll={{ x: "max-content" }}
      pagination={false}
    />
  }
)

export { SiteTable };
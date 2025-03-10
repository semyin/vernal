import React, { startTransition } from "react";
import { Button, Form, Input, Select, FormItemProps, DatePicker } from "antd";
import { withFallback } from "vike-react-query";
import { useMountedStyles } from "#root/hooks/useMountedStyles";

const { RangePicker } = DatePicker;

// 定义每种过滤类型的配置
type InputFilterConfig = {
  type: "input";
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  rules?: FormItemProps["rules"];
  style?: React.CSSProperties;
};

type SelectFilterConfig = {
  type: "select";
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: any }[];
  defaultValue?: any;
  rules?: FormItemProps["rules"];
  style?: React.CSSProperties;
};

type MultipleSelectFilterConfig = {
  type: "multipleSelect";
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: any }[];
  defaultValue?: any[];
  rules?: FormItemProps["rules"];
  style?: React.CSSProperties;
};

type BooleanSelectFilterConfig = {
  type: "booleanSelect";
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: boolean;
  rules?: FormItemProps["rules"];
  style?: React.CSSProperties;
};

type RangePickerFilterConfig = {
  type: "rangePicker";
  name: string;
  label?: string;
  placeholder?: [string, string];
  defaultValue?: [any, any];
  rules?: FormItemProps["rules"];
  style?: React.CSSProperties;
};

type CustomFilterConfig = {
  type: "custom";
  name: string;
  label?: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  defaultValue?: any;
  rules?: FormItemProps["rules"];
  style?: React.CSSProperties;
};

// 联合所有过滤类型
export type FilterItemConfig =
  | InputFilterConfig
  | SelectFilterConfig
  | MultipleSelectFilterConfig
  | BooleanSelectFilterConfig
  | RangePickerFilterConfig
  | CustomFilterConfig;

export interface FilterFormProps<T> {
  filterItems: FilterItemConfig[];
  onFilter: (values: T) => void;
  onAdd?: () => void;
  initialValues?: Partial<T>;
  styles?: React.CSSProperties;
}

const FilterForm = React.memo(
  withFallback(
    <T extends Record<string, any>>({
      filterItems,
      onFilter,
      onAdd,
      initialValues,
      styles,
    }: FilterFormProps<T>) => {
      const [form] = Form.useForm();

      const handleFilter = () => {
        startTransition(() => {
          const values = form.getFieldsValue();

          // 处理日期格式化
          const formattedValues = Object.keys(values).reduce((acc, key) => {
            const itemConfig = filterItems.find((item) => item.name === key);

            if (
              itemConfig?.type === "rangePicker" &&
              Array.isArray(values[key])
            ) {
              acc[key] = values[key].map((date) =>
                date ? date.format("YYYY-MM-DD") : null
              );
            } else {
              acc[key] = values[key];
            }

            return acc;
          }, {} as Record<string, any>);

          onFilter(formattedValues as T);
        });
      };

      const _s = useMountedStyles();

      const renderFilterItem = (item: FilterItemConfig) => {
        switch (item.type) {
          case "input":
            return (
              <Form.Item
                name={item.name}
                key={item.name}
                label={item.label}
                rules={item.rules}
                initialValue={item.defaultValue}
              >
                <Input
                  placeholder={item.placeholder}
                  allowClear
                  style={item.style}
                />
              </Form.Item>
            );
          case "select":
            return (
              <Form.Item
                name={item.name}
                key={item.name}
                label={item.label}
                rules={item.rules}
                initialValue={item.defaultValue}
              >
                <Select
                  placeholder={item.placeholder}
                  options={item.options}
                  allowClear
                  style={item.style}
                />
              </Form.Item>
            );
          case "multipleSelect":
            return (
              <Form.Item
                name={item.name}
                key={item.name}
                label={item.label}
                rules={item.rules}
                initialValue={item.defaultValue}
              >
                <Select
                  placeholder={item.placeholder}
                  options={item.options}
                  mode="multiple"
                  maxTagCount="responsive"
                  allowClear
                  style={item.style}
                />
              </Form.Item>
            );
          case "booleanSelect":
            return (
              <Form.Item
                name={item.name}
                key={item.name}
                label={item.label}
                rules={item.rules}
                initialValue={item.defaultValue}
              >
                <Select
                  placeholder={item.placeholder}
                  allowClear
                  style={item.style}
                >
                  <Select.Option value={true}>是</Select.Option>
                  <Select.Option value={false}>否</Select.Option>
                </Select>
              </Form.Item>
            );
          case "rangePicker":
            const placeholder: [string, string] | undefined = Array.isArray(
              item.placeholder
            )
              ? item.placeholder
              : ["开始日期", "结束日期"];
            return (
              <Form.Item
                name={item.name}
                key={item.name}
                label={item.label}
                rules={item.rules}
                initialValue={item.defaultValue}
              >
                <RangePicker
                  placeholder={placeholder}
                  format="YYYY-MM-DD"
                  style={item.style}
                />
              </Form.Item>
            );
          case "custom":
            const CustomComponent = item.component;
            return (
              <Form.Item
                name={item.name}
                key={item.name}
                label={item.label}
                rules={item.rules}
                initialValue={item.defaultValue}
              >
                <CustomComponent {...item.props} />
              </Form.Item>
            );
          default:
            return null;
        }
      };

      return (
        <Form
          style={
            styles
              ? styles
              : {
                  margin: "0 0 20px 0",
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "16px",
                  ..._s,
                }
          }
          form={form}
          layout="inline"
          initialValues={initialValues}
        >
          {filterItems.map(renderFilterItem)}
          <Form.Item>
            <Button type="primary" onClick={handleFilter}>
              搜索
            </Button>
          </Form.Item>
          {onAdd && (
            <Form.Item>
              <Button type="primary" onClick={onAdd}>
                添加
              </Button>
            </Form.Item>
          )}
        </Form>
      );
    }
  )
);

export { FilterForm };

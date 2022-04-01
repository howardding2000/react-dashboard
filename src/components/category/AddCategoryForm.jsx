import React from "react";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Opton = Select.Option;
const AddCategoryForm = React.forwardRef(({ categories, parentId }, ref) => {
  const [form] = Form.useForm();
  ref.current = form;

  return (
    <Form form={form} initialValues={{ parentId: parentId }}>
      <Item name='parentId'>
        <Select>
          <Opton value='0'>First Level category</Opton>
          {categories.map((cat) => (
            <Opton key={cat._id} value={cat._id}>
              {console.log(cat._id)}
              {cat.name}
            </Opton>
          ))}
        </Select>
      </Item>
      <Item
        name='categoryName'
        rules={[{ required: true, message: "Please enter category name." }]}
      >
        <Input placeholder='Please enter category name...' />
      </Item>
    </Form>
  );
});

export default AddCategoryForm;

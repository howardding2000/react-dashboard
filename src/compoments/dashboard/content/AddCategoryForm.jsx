import React from "react";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Opton = Select.Option;
const AddCategoryForm = ({ categories, parentId }) => {
  return (
    <Form>
      <Item>
        <Select defaultValue={parentId}>
          <Opton value='0'>First Level category</Opton>
          {categories.map((cat) => (
            <Opton key={cat._id} value={cat._id}>
              {console.log(cat._id)}
              {cat.name}
            </Opton>
          ))}
        </Select>
      </Item>
      <Item>
        <Input placeholder='Please enter category name...' />
      </Item>
    </Form>
  );
};

export default AddCategoryForm;

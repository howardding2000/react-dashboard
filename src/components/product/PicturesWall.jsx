import React, { useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { reqDeleteImage } from "api";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const PicturesWall = React.forwardRef((props, ref) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = async ({ file, fileList }) => {
    if (file.status === "removed") {
      const result = await reqDeleteImage(file.name);
      console.log("removed", result);
      if (result.status === 0) {
        message.success("Image removed!");
      }
    }

    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("Image uploaded!");
        const { name, url } = result.data;
        file.name = name;
        file.url = url;
      } else {
        message.error("Image upload fail!");
      }
    }
    console.log(file, file.status, fileList);
    setFileList(fileList);
    // setImagesList(fileList);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  return (
    <>
      <Upload
        ref={ref}
        action='/manage/img/upload'
        accept='image/*'
        listType='picture-card'
        name='image'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt='example' style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
});

export default PicturesWall;

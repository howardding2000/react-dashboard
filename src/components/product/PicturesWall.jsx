import React, { useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_IMG_URL } from "utils/constants";
import { reqDeleteImage } from "api";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const PicturesWall = React.forwardRef(({ imgs }, ref) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [preview, setPreview] = useState();

  // load the existing images for update product
  let initFileList = [];
  if (imgs && imgs.length > 0) {
    initFileList = imgs.map((img, index) => ({
      uid: -index,
      name: img,
      status: "done",
      url: BASE_IMG_URL + img,
    }));
  }
  
  console.log(initFileList);
  const [fileList, setFileList] = useState(initFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = async ({ file, fileList }) => {
    if (file.status === "removed") {
      const result = await reqDeleteImage(file.name);
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
    setFileList(fileList);
    // setImagesList(fileList);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const previewImage = file.url || file.preview
    const previewTitle = file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    setPreview({previewImage,previewTitle});
    setPreviewVisible(true);

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
        title={preview.previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt='example' style={{ width: "100%" }} src={preview.previewImage} />
      </Modal>
    </>
  );
});

export default PicturesWall;

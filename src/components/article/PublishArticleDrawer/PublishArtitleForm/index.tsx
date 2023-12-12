import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import ArticleTags from './ArticleTags';

import labels from '@/mock/label.json';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      offset: 16,
    },
  },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const PublishArtitleForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>();
  const [imageUrl, setImageUrl] = useState();

  const onFinish = (values) => {
    if (onSubmit) onSubmit(values);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'error') {
      setLoading(false);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (image) => {
        setImageUrl(image);
        setLoading(false);
      });
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="publishArticle"
      onFinish={onFinish}
      initialValues={{}}
      scrollToFirstError
    >
      <Form.Item
        name="category"
        label="分类"
        rules={[
          {
            required: true,
            message: '选择一个分类!',
            validator: (_, value) => {
              if (!value) return Promise.reject(new Error('选择一个分类!'));
              return Promise.resolve();
            },
          },
        ]}
      >
        <ArticleTags />
      </Form.Item>

      <Form.Item
        name="label"
        label="添加标签"
        rules={[
          {
            required: true,
            message: '选择标签!',
          },
        ]}
      >
        <Select placeholder="选择标签">
          {labels.map((item) => {
            return (
              <Option key={item.tag_id} value={item.tag_id}>
                {item.tag.tag_name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name="coverImage" label="文章封面">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item name="specialColumn" label="收录至专栏" rules={[]}>
        <Select placeholder="搜索添加专栏">
          <Option key={1}>全栈技术部</Option>
          <Option key={2}>全栈技术部</Option>
        </Select>
      </Form.Item>

      <Form.Item name="abstract" label="编辑摘要">
        <Input.TextArea
          maxLength={100}
          placeholder="输入编辑摘要"
          style={{ width: '100%' }}
          showCount
          autoSize={{ minRows: 6, maxRows: 8 }}
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          确定并发布
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PublishArtitleForm;

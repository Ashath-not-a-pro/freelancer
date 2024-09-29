"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Upload, Typography, message } from "antd";
import { Box } from "@mui/material";
import { UploadOutlined } from "@ant-design/icons";
import { InputController } from "./inputController";
import { updateUserData } from "@/_actions/service";
import { constants } from "@/lib/mock";
import SelectController from "./selectController";

const { Title } = Typography;

const UserDetailForm = ({ form, handleClose }: any) => {
  const initialValues = {
    photo: form?.photo,
    email: form?.email,
    name: form?.name,
    company_name: form?.company_name,
    company_description: form?.company_description,
    mobile: form?.mobile,
    address: form?.address,
    skills: form?.skills,
  };
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: initialValues,
  });

  console.log(form);

  const isFreelancer = form?.isFreelancer;

  const onSubmit = async (data: any) => {
    try {
      await updateUserData(form._id, data);
      message.success("Updated sucessfully");
      handleClose()
    } catch (error: any) {
      message.error(error?.stack.toString());
    }
  };

  // Ant Design upload handler
  const handleUpload = (info: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setValue("photo", e.target.result);
    };
    reader.readAsDataURL(info.file);
  };

  return (
    <Box
      sx={{ padding: "2rem", backgroundColor: "#f9f9f9", borderRadius: "8px" }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title level={3}>Edit details</Title>

      <InputController
        name="name"
        label="Name"
        fieldType="text"
        control={control}
      />

      <InputController
        name="mobile"
        label="Mobile"
        fieldType="number"
        control={control}
      />

      {isFreelancer && (
        <InputController
          name="address"
          label="Address"
          fieldType="text"
          control={control}
        />
      )}

      {!isFreelancer && (
        <>
          <InputController
            name="company_name"
            fieldType="text"
            label="Company Name"
            control={control}
          />
          <InputController
            name="company_description"
            fieldType="text"
            label="Company description"
            control={control}
          />
        </>
      )}

      <InputController
        name="email"
        label="email"
        fieldType="email"
        control={control}
      />

      {isFreelancer && (
        <SelectController
          control={control}
          name="skills"
          label={"Interest"}
          select_option={constants.skillList}
        />
      )}

      <Controller
        name="photo"
        control={control}
        render={({ field }) => (
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            className="mt-6"
            onChange={handleUpload}
            showUploadList={{ showPreviewIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        )}
      />

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Box>
  );
};

export default UserDetailForm;

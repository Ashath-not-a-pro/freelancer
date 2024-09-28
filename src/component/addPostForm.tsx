/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Box from "@mui/material/Box";
import { InputController } from "./inputController";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Upload, message, Image } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { addPost } from "@/_actions/service";
import { useRouter } from "next/navigation";

const AddPostForm = (props: any) => {
  const { formData, handleClose } = props;

  const router = useRouter();

  const formInitial = {
    img: null,
    topic: "",
    description: "",
  };

  const initialState: any = {
    previewImage: "",
    previewOpen: false,
    fileList: [],
  };

  const isEdit = !!formData?._id;
  console.log(isEdit);

  const [state, setState] = useState(initialState);

  const { control, handleSubmit, setValue } = useForm<any>({
    reValidateMode: "onChange",
    defaultValues: formInitial,
  });

  useEffect(() => {
    if (formData?._id) {
      const imgList: any = formData?.img
        ? [{ uid: "-1", name: "Image", status: "done", url: formData?.img }]
        : [];
      setState({ ...state, fileList: imgList });
      setValue("img", formData?.img);
      setValue("title", formData?.title);
      setValue("description", formData?.description);
    }
  }, []);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setState({ ...state, fileList: fileList });
    setValue("img", null);
  };

  const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }
    setState({
      ...state,
      previewImage: file.url || (file.preview as string),
      previewOpen: true,
    });
  };

  const handleRemove = () => {
    setState({ ...state, fileList: [] });
    setValue("img", "");
  };

  const updateData = async (form: any) => {
    const base64Img = await convertFileToBase64(
      state?.fileList[0]?.originFileObj as File
    );
    form.img = base64Img;
    try {
      console.log({ form });
      const createSkillResponse = await addPost({
        topic: form.topic,
        description: form.description,
        image: form.img,
      });
      if (createSkillResponse._id) {
        handleClose(true);
        message.success("Post created");
        router.back();
      }
    } catch {
      message.success("Post created");
      router.back();
    }
  };

  return (
    <div className="border rounded-lg p-10 mt-10 max-w-2xl mx-auto bg-gray-50 shadow-lg">
      <h3 className="text-gray-700 text-center text-2xl font-semibold mb-6">
        {isEdit ? "Edit Post" : "Add Post"}
      </h3>
      <Box
        component={"form"}
        onSubmit={handleSubmit(updateData)}
        className="bg-white rounded-lg p-6"
      >
        <InputController
          control={control}
          name={"topic"}
          label="Topic"
          fieldType={"text"}
          required
          className="mb-4"
        />

        <InputController
          control={control}
          name={"description"}
          label="Description"
          fieldType={"textarea"}
          multiline
          required
          className="mb-4"
        />

        <div className="flex justify-center mb-4">
          <Upload
            listType="picture-card"
            fileList={state.fileList}
            onChange={handleFileChange}
            onPreview={handlePreview}
            onRemove={handleRemove}
          >
            {state.fileList.length === 0 && "Upload"}
          </Upload>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg w-full py-2"
            htmlType="submit"
          >
            {isEdit ? "Update Post" : "Submit"}
          </Button>
        </div>
      </Box>

      {state.previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: state.previewOpen,
            onVisibleChange: (visible) =>
              setState({ ...state, previewOpen: visible }),
            afterOpenChange: (visible) =>
              !visible && setState({ ...state, previewImage: "" }),
          }}
          src={formData.img}
        />
      )}
    </div>
  );
};

export default AddPostForm;

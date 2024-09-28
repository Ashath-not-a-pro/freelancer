import { deletePost, getPosts } from "@/_actions/service";
import { message, Modal, Table } from "antd";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useShowHideWithRecord } from "@/lib/util";
import AddPostForm from "./addPostForm";

export const PostTable = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const data: any = await getPosts();
      setLoading(false);
      setPost(data);
    }
    fetchPost();
  }, [refetch]);

  const initial = {
    model: false,
  };

  const { object, handleShow, handleHide } = useShowHideWithRecord(initial);

  const handleClick = (record: any) => {
    handleShow("model", "", "record", record);
  };

  const handleRefetch = () => {
    handleHide();
    setRefetch(!refetch);
  };

  const handleDelete = async(record:any)=> {
    try {
        await deletePost(record?._id)
        message.success("deleted successfully")
        setRefetch(!refetch);
    } catch (error) {
        console.log(error)
    }
  }

  const columns: any = [
    {
      title: "Image",
      key: "img",
      render: (record: any) => (
        <img
          className="w-12 h-12 rounded-md"
          src={record?.image}
          alt={record?.topic}
        />
      ),
    },
    {
      title: "Topic",
      key: "topic",
      render: (record: any) => <div>{record?.topic}</div>,
    },
    {
      title: "Description",
      key: "description",
      render: (record: any) => <div>{record?.description}</div>,
    },
    {
      title: "Actions",
      key: "action",
      render: (record: any) => (
        <div className="flex gap-3">
          <Edit
            className="text-secondary"
            size={18}
            onClick={() => handleClick(record)}
          />
          <Trash2 className="text-red-500" size={18} onClick={()=> handleDelete(record)}/>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={posts}
        loading={loading}
        pagination={false}
        rowKey={(record: any) => record?._id}
      />
      {object.model ? (
        <Modal open={object.model} footer={[]} onCancel={() => handleHide()}>
          <AddPostForm
            formData={object.record}
            handleClose={() => handleRefetch()}
          />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

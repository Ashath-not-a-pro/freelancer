import React, { useContext } from "react";
import UserDetailForm from "./updateuserForm";
import { useShowHideWithRecord } from "@/lib/util";
import { Modal } from "antd";
import { Edit } from "lucide-react";
import { constants } from "@/lib/mock";
import UserContext from "@/context/userContext";

const DetailContainer = (props: any) => {

  const context = useContext(UserContext)

  const user = context?.user

  const initial = {
    model: false,
  };
  const { object, handleShow, handleHide } = useShowHideWithRecord(initial);

  const handleFormClose = ()=> {
    context.reload()
    handleHide()
  }

  const interestList = user.skills.map((item:any)=> constants.skillList[item].label).join(", ")

  return (
    <>
      <div className="bg-white rounded-sm p-4">
        {/* Header with title and Edit icon */}
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-semibold">User Details</h2>
          <Edit
            className="text-secondary cursor-pointeresponse[0]r"
            size={18}
            onClick={() => handleShow("model", "", "data", user)}
          />
        </div>

        {/* User details display */}
        <div className="flex m-4 gap-10">
          <img
            src={user?.photo}
            className="w-48 h-48 rounded-md object-cover"
            alt={user.name}
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-medium">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">Mobile:</span>
              <span>{user?.mobile}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">User Type:</span>
              <span>{user?.user_type}</span>
            </div>
            {!user?.isFreelancer && (
              <>
                <div className="flex gap-2">
                  <span className="font-medium">Company:</span>
                  <span>{user?.company_name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Company Description:</span>
                  <span>{user?.company_description}</span>
                </div>
              </>
            )}
            {user?.isFreelancer && (
              <>
                <div className="flex gap-2">
                  <span className="font-medium">Address:</span>
                  <span>{user?.address}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Interest:</span>
                  <span>
                    {interestList}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {object.model && (
        <Modal open={object.model} footer={null} onCancel={handleHide}>
          <UserDetailForm form={user} handleClose={handleFormClose} />
        </Modal>
      )}
    </>
  );
};

export default DetailContainer;

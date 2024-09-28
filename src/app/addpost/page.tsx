"use client"
import AddPostForm from "@/component/addPostForm";
import { NavBar } from "@/component/navBar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


const AddPost = () => {
  const router = useRouter()
  return (
    <div className=" min-h-screen">
      <NavBar title={<ArrowLeft onClick={()=> router.push("/")} />} />
      <div className="flex items-center justify-center">
        <AddPostForm />
      </div>
    </div>
  )
};

export default AddPost;

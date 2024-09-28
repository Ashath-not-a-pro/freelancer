/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import connectDB from "@/lib/db";
import PostModal from "@/models/postModal";
import UserModel from "@/models/userModel";

export async function getUsers(userData: any = {}) {
  try {
    await connectDB();

    const data: any = await UserModel.find(userData);

    return data;
  } catch (error: any) {
    console.log(error)
    return { err: error?.message };
  }
}

export async function getPosts() {
  try {
    await connectDB();

    const data = await PostModal.find();

    return data;
  } catch (error: any) {
    return { err: error?.message };
  }
}

export async function createUser(userData: {
  name: string;
  password: string;
  mobile: string;
  user_type: string
}) {
  try {
    await connectDB();

    const newUser = new UserModel(userData);
    await newUser.save();

    return newUser;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function auth(mobile: string, password: string) {
  await connectDB();

  const userData: any = await getUsers({ mobile });
  const userPass = password == userData[0]?.password;
  const userId = userData[0]?._id

  if (userPass) {
    return { success: true, id: userId};
  } else {
    throw new Error("Un-authorized");
  }
}

export async function updateUser(id: any, userData: any) {
  await connectDB();

  const filter = { _id: id };
  const update = { $set: userData };

  try {
    const result = await UserModel.updateOne(filter, update);
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}


export async function deleteUser(id: any) {
  await connectDB();

  const filter = { _id: id };

  try {
    const result = await UserModel.deleteOne(filter);
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function addPost(postData:{topic:string, description: string, image: string}) {
  try {
    await connectDB();

    const newUser = new PostModal(postData);
    await newUser.save();

    return newUser;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function updatePost(id: string, postData: { img: string; topic: string; description: string }) {
  try {
    await connectDB();

    const filter = { _id: id };
    const update = { $set: { image: postData?.img, topic: postData?.topic, description: postData?.description } };

    const updateUser = await PostModal.updateOne(filter, update);

    return updateUser;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function deletePost(id: any) {
  await connectDB();

  const filter = { _id: id };

  try {
    const result = await PostModal.deleteOne(filter);
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}


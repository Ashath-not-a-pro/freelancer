/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { NavBar } from './navBar'
import { getPosts } from '@/_actions/service'
import { PostCard } from './postCard'
import { CirclePlus, CircleUser } from 'lucide-react'
import { useRouter } from 'next/navigation'

const MainContainer = () => {

  const [post,setPost] = useState([])
  const router = useRouter();

  useEffect(()=> {

    async function fetchData() {
      const list:any = await getPosts()
      setPost(list)
    }
    fetchData()
  },[])
  
  const hasList = post.length > 0
  const icons = [<CirclePlus onClick={() => router.push("/addpost")} />, <CircleUser onClick={() => router.push("/dashboard")} />]
  return (
    <div>
      <NavBar title={'FreeLancer'} icons={icons}/>
      <div>
        {
          hasList ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-2'>
          {post.map((item:any,i:number)=> {
            return (
              <PostCard key={i} img={item.image} description={item.description} topic={item.topic} />
            )
          })}
        </div>
          ): (
            <div className='text-gray-700'>no data found</div>
          )
        }
        
      </div>
    </div>
  )
}

export default MainContainer

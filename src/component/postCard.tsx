import { useRouter } from "next/navigation";

export const PostCard = (props: { img: string; description: string; topic: string; item:any }) => {
    const { img, description, topic, item } = props;

    const router = useRouter()
    return (
      <div className="border rounded-lg bg-white shadow-md transition-shadow duration-300 h-full w-full" onClick={()=> router.push(`contact/${item._id}`)}>
        <div className="h-72 overflow-auto" style={{ scrollbarWidth: "none" }}>
          <img
            src={img}
            alt={topic}
            className="w-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="text-lg font-semibold text-gray-800">{topic}</div>
          <div className="mt-2 text-gray-600">{description}</div>
        </div>
      </div>
    );
  };
  
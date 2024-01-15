import Image from "next/image";
import Link from "next/link";
import React from "react";

async function fetchBlogs(id : number) {
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
      }
    }
  
    try {
      const res = await fetch(`http://127.0.0.1:1337/api/blogs/${id}?populate=*`, options);
      const response = await res.json();
      return response;
    } catch (err) {
      console.error(err);
    }
  }

const page = async ({params}: any) => {
    const blog = await fetchBlogs(params.id);

    const imageUrl = "http://127.0.0.1:1337" + blog.data.attributes.img.data.attributes.url;
    const Opt1Url = "http://127.0.0.1:1337" + blog.data.attributes.Option1.data.attributes.url;
    const Opt1Ur2 = "http://127.0.0.1:1337" + blog.data.attributes.Option2.data.attributes.url;
    const Opt1Ur3 = "http://127.0.0.1:1337" + blog.data.attributes.Option3.data.attributes.url;

  return (
    <div className="max-w-3xl mx-auto p-4">
        <Link href="/">{"Back"}</Link>
        <div className="relative w-full h-96 overflow-hidden rounded-lg mt-5">
            <Image layout="fill" objectFit="react" src={imageUrl} alt={""}/>
        </div>
        <div className="mt-4">
            <h1 className="text-3xl font-semibold">
              ₱ {" "} {Number(blog.data.attributes.Price).toLocaleString()}
            </h1>

            <div className="flex space-x-4">
              <div className="relative w-40 h-40 overflow-hidden rounded-lg mt-5">
                <Image layout="fill" objectFit="react" src={Opt1Url} alt={""}/>
              </div>
              <div className="relative w-40 h-40 overflow-hidden rounded-lg mt-5">
                <Image layout="fill" objectFit="react" src={Opt1Ur2} alt={""}/>
              </div>
              <div className="relative w-40 h-40 overflow-hidden rounded-lg mt-5">
                <Image layout="fill" objectFit="react" src={Opt1Ur3} alt={""}/>
              </div>
            </div>

            <p className="text-gray-600 mt-2">
                {blog.data.attributes.Description}
            </p>
            <div>
              <p className="text-gray-600 mt-2">
                <span>Dealer's Email:</span>{" "}
                <span className="text-red-500">{blog.data.attributes.Email}</span>
              </p>
            </div>

            <div className="mt-4 flex items-center text-gray-400">
                <span className="text-sm">
                    Published on {" "}{new Date(blog.data.attributes.publishedAt).toLocaleString()}
                </span>
            </div>
        </div>
    </div>
  );
};

export default page;
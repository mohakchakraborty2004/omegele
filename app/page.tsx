import Image from "next/image";


export default function Home() {
  return (
    <>
       <div className="grid grid-cols-6">
        <div className="col-span-4 h-[100vh] flex justify-center p-[5rem]">
     <Image src={"/FPheroPic.png"} quality={100} alt="" height={400} width={180} className="w-[100rem] h-[40rem]"></Image>
        </div>
        <div className="col-span-2 h-[100vh] flex flex-col justify-center items-center p-10 pr-16">
        <h1 className="text-[3rem] font-extrabold">Match with random people/cats</h1>
        <button className="mt-10  relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
START
</span>
</button>
        </div>
       </div>
    </>
  );
}

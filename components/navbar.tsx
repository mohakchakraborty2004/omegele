import Image from "next/image"

 const Navbar = () => {
  
    return(
        <>
        <div className="flex justify-center items-center p-5">
            <Image src={"/logoFP.png"} alt="logo"
            height={200}
            width={200}
            ></Image>
        </div>
        </>
    )
}

export default Navbar;
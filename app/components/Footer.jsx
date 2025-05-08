import Logo from "../assets/images/ReCompute.png";
import Image from "next/image";
import DropDown from "./CategoryDropdown"
import { RiVisaLine, RiPaypalFill, RiMastercardFill } from "react-icons/ri";
import { FaGooglePay, FaApplePay } from "react-icons/fa";

export default function Footer() {
    return (
    <div className=" flex  flex-col fixed bottom-0"> 
    <div className="text-[#F55266] flex  items-center ">
        <Image src={Logo} alt="Logo" className="w-1/6 lg:w-1/12 justify-center flex " />
        ReCompute</div>
    <div className="w-screen">
    <div className="flex "> <DropDown/> </div>
    <a className="flex p-4 w-3 lg:hover:text-gray-400" href="/profile" >Profile</a>
    <div className="flex p-4 border-t-2 border-gray-700 gap-4 justify-center md:justify-start  flex-row">
        <RiVisaLine className="w-7 h-7" /> 
        <RiPaypalFill className="w-7 h-7" /> 
        <RiMastercardFill className="w-7 h-7" /> 
        <FaGooglePay className="w-9 h-9"/> 
        <FaApplePay className="w-9 h-9"/> 
    </div>
    
    </div> 
    </div>
    
    
    )}
    
'use client'
import { Rating } from "@mui/material"
import { useSession } from "next-auth/react";
export default async function Review({id,name,comment,rating,role}:{id:string,name:string,comment:string,rating:number,role:string}){
    const session=useSession();
    const removeReviewHandler = () => {
        alert("delete review eiei");
        // res=await deleteReview(id,session.user.token); ????
    };
    const cancelReportHandler= ()=>{
        alert("discard report");
        // res=await deleteReport(id,session.user.token); ????
    };

    return(
        <div className="w-[710px] h-[300px] px-3.5 py-6 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-black inline-flex flex-col justify-start items-start gap-8">
            <div className="self-stretch inline-flex justify-between items-end">
                <div className="w-52 h-5 relative bg-purple-100">
                    <Rating value={rating} precision={0.5} size="large"/>
                </div>
                <div className="w-100 h-9 px-5 pb-2.5  rounded-[20px] flex justify-center items-center gap-2.5">
                    {
                        role==='admin' ?
                        <div className="flex flex-row place-items-around">
                            <button 
                                className="rounded-full justify-start p-2 m-5 bg-[#C46B65] text-white text-xl font-black font-['Inter'] hover:bg-red-500 "
                                onClick={()=>{removeReviewHandler()}}
                                >
                                Remove Review
                            </button>
                            <button 
                                className="rounded-full justify-start p-2 my-5 bg-[#65C465] text-white text-xl font-black font-['Inter'] hover:bg-green-600 "
                                onClick={()=>{removeReviewHandler()}}
                                >
                                Cancel Report
                            </button>
                        </div>
                        
                        : <button className="rounded-sm justify-start p-2 bg-[#C46B65] text-white text-xl font-black font-['Inter'] hover:bg-red-400 ">REPORT</button> 
                    }
                </div> 
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-8">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                    <div className="self-stretch justify-start text-black text-2xl font-semibold font-['Inter']">{name}</div>
                        <div className="self-stretch justify-start">
                            <span className="text-black text-base font-normal font-['Inter']">
                                {comment}
                                <br/>
                            </span>
                            <span className="text-red-600 text-base font-normal font-['Inter']">
                                **ตัดที่ 7 บรรทัด ถ้าเกินให้เติม “... 
                            </span>
                            <span className="text-red-600 text-base font-normal font-['Inter'] underline">
                                more
                            </span>
                            <span className="text-red-600 text-base font-normal font-['Inter']">
                                ” ต่อ
                                <br/>
                                อย่านับ char เอา
                            </span>
                        </div>
                </div>
                <div className="w-80 h-44 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-stone-600 inline-flex flex-col justify-end items-end gap-2.5 overflow-hidden">
                    <div className="px-2.5 bg-black/50 rounded-[5px] inline-flex justify-center items-center gap-2.5">
                        <div className="justify-start text-white text-2xl font-semibold font-['Inter']">+2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
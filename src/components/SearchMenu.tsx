'use client'
import { IoSearch } from "react-icons/io5";
import { FaCampground } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useState, useEffect } from "react";
import ReviewList from "./ReviewList";
import getReports from "@/libs/getReports";
import { useSession } from "next-auth/react";

export default function SearchMenu() {
    const { data: session, status } = useSession();
    const [queryCamp, setCamp] = useState('');
    const [queryUser, setUser] = useState('');
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    if(!session||session.user.role!=='admin') return null;

    const fetchReports = async () => {
        if (session?.user.token) {
            setIsLoading(true);
            setError("");
    
            try {
                const fetchedReports = await getReports(session.user.token, queryUser, queryCamp);
                console.log(fetchedReports.data);
                setReports(fetchedReports.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
                setError("Failed to fetch reports");
            } finally {
                setIsLoading(false);
            }
        }
    };    
    
    // Initial fetch on component mount
    useEffect(() => {
        fetchReports();
    }, [session?.user.token]);

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col md:flex-row">
                <div className="m-5 md:m-10 w-full md:w-[45%] flex text-[#999999] flex-row h-10 bg-zinc-300 rounded-[30px] border-none focus-within:ring-2 focus-within:ring-zinc-500">
                    <div className="ml-5 mt-3 w-10 h-10">
                        <FaCampground color="#323232" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Campground Name"
                        className="w-full h-full p-3 pl-2 rounded-[30px] bg-zinc-300 border-0 focus:outline-none"
                        value={queryCamp}
                        onChange={(e) => setCamp(e.target.value)}
                    />
                    <button 
                        className="w-10 h-10 mr-2" 
                        onClick={()=>{fetchReports();console.log(queryUser+" "+queryCamp);}}
                        disabled={isLoading}
                    >
                        <IoSearch color="#323232" size={20} />
                    </button>
                </div>

                <div className="m-5 md:m-10 w-full md:w-[45%] flex flex-row h-10 bg-zinc-300 rounded-[30px] border-none focus-within:ring-2 focus-within:ring-zinc-500">
                    <div className="ml-5 mt-3 w-10 h-10">
                        <FaUser color="#323232" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Username"
                        className="w-full h-full pl-2 text-[#999999] rounded-[30px] p-3 bg-zinc-300 border-0 focus:outline-none"
                        value={queryUser}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <button 
                        className="w-10 h-10 mr-2" 
                        onClick={()=>{fetchReports();console.log(queryUser+" "+queryCamp);}}
                    >
                        <IoSearch color="#323232" size={20} />
                    </button>
                </div>
            </div>
            
            {isLoading && <div className="text-center py-4">Loading reports...</div>}
            {error && <div className="text-red-500 text-center py-4">{error}</div>}
            
            <div className="px-5 md:px-10 w-full">
                <ReviewList reviews={reports} role="admin" cancel={true} token={session?.user.token}/>
            </div>
        </div>
    );
}
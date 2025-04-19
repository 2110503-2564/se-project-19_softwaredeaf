"use client"
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs";

interface DateReserveProps {
    dateName: string;
  }
export default function DateReserve({dateName,onDateChange}:{dateName:string,onDateChange:Function}){

    const [reserveDate,setReserveDate] = useState<Dayjs|null>(null);

    return(
        <div className="flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" label={dateName}
                value={reserveDate} onChange={(value)=>{setReserveDate(value);onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    );
}
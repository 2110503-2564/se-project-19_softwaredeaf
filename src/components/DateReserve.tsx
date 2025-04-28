"use client"
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from 'dayjs';
import { Dayjs } from "dayjs";


export default function DateReserve({dateName,onDateChange,minDate,maxDate,initDate}:{dateName:string,onDateChange:Function,minDate?:Dayjs|null,maxDate?:Dayjs|null,initDate?:Dayjs|null}){

    const [reserveDate,setReserveDate] = useState<Dayjs|null>(initDate||null);

    return(
        <div className="flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" format="DD/MM/YYYY" label={dateName}
                value={reserveDate} onChange={(value)=>{setReserveDate(value);onDateChange(value)}}  minDate={minDate || dayjs()} maxDate={maxDate||undefined} />
            </LocalizationProvider>
        </div>
    );
}
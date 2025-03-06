"use client"

import { useEffect, useState } from "react"

export const useDebounceValue = (value:any,delay=500)=>{
 const [debounced,setDebounced]=useState(value)
 useEffect(()=>{
    console.log(value,"value")
    const timeout = setTimeout(() => {
        setDebounced(value)
    }, delay);
    return ()=> clearTimeout(timeout)
 },[value,delay])

 return debounced

}
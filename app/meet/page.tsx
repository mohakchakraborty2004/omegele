"use client";

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";


export default function Meet(){
    const [next, setNext] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const {socket, connected} = useSocket();

    useEffect(()=> {
     if(!socket || !connected){
        console.log("no socket found")
     }

     if(socket){
        socket.send(JSON.stringify({
            action: "match",
        }))

        socket.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);

            if(parsedMessage.type === "offer"){
                console.log("parsed message recieved");
            }
        }
      }
    }, [socket])

    const handleMessage = () => {
       if(!socket || !connected){
        console.log("no socket")
       }

       console.log("user connected")

      if(socket){
        socket.send(JSON.stringify({
            type : "offer",
            sdp : "SDP_INFO"
        }))
      }
    }

    return (
        <>

        <button onClick={handleMessage}> 
            join
        </button>
        
        </>
    )
} 
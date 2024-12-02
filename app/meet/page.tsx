"use client";

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";


export default function Meet(){
    const [next, setNext] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [PC , setPc] = useState<RTCPeerConnection>()
    const {socket, connected} = useSocket();
   
    // setPc(PC);

    useEffect(() =>{
        const pc = new RTCPeerConnection();
        setPc(pc);
    }, [])

    useEffect(()=> {
     if(!socket || !connected){
        console.log("no socket found")
     }

     if(socket){
        socket.send(JSON.stringify({
            action: "match",
        }))

        socket.onmessage =  async(event) => {
            const parsedMessage = JSON.parse(event.data);

            if(parsedMessage.type === "offer"){

                console.log("offer recieved")

               await PC!.setRemoteDescription(parsedMessage.sdp);
               const answer = await PC!.createAnswer();

                console.log(answer)

               await PC!.setLocalDescription(answer);

               socket.send(JSON.stringify({
                type: PC!.localDescription?.type,
                sdp : PC!.localDescription?.sdp
               }))

            }

            if(parsedMessage.type === "answer"){
                console.log("answer recieved")
                await PC!.setRemoteDescription(parsedMessage.sdp);
            }
        }
      }
    }, [socket, connected])

    const handleMessage = async() => {
       if(!socket || !connected){
        console.log("no socket")
       }

       console.log("user connected")


      if(socket){
        PC!.onnegotiationneeded = async() => {
            const offer = await PC!.createOffer();
            await PC!.setLocalDescription(offer);
    
            const type = PC!.localDescription?.type 
            const sdp = PC!.localDescription?.sdp
    
            socket.send(JSON.stringify({
                type : type,
                sdp : sdp
            }))
    
          }
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
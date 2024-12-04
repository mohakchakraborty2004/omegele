"use client";

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";


export default function Meet(){
    const [str, setStr] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [PC , setPc] = useState<RTCPeerConnection>()
    const {socket, connected} = useSocket();
   
    // setPc(PC);

    useEffect(() =>{
        const pc = new RTCPeerConnection();
        setPc(pc);
        console.log("pc connected");


    }, [])

    useEffect(()=> {
     if(!socket || !connected){
        console.log("no socket found")
     }

     if(socket){
        socket.send(JSON.stringify({
            action: "match",
        }))
  
        PC!.ontrack = (event) => {
            console.log("vid recieved");
            const remoteVideo = document.getElementById("vid") as HTMLVideoElement;
            if(remoteVideo){
                console.log("vid", event.streams[0]);
                //@ts-ignore
                remoteVideo.srcObject = event.streams[0]; 
            }

            }



        socket.onmessage =  async(event) => {
            const parsedMessage = JSON.parse(event.data);

            if(parsedMessage.type === "matched"){
                setLoading(false)
                // sending offer logic here
            }

            if(parsedMessage.type === "offer"){

                console.log("offer recieved")

               await PC!.setRemoteDescription(parsedMessage);
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
                await PC!.setRemoteDescription(parsedMessage);
            }

            if (parsedMessage.type === "candidate"){
                if(parsedMessage.candidate){
                    const iceCandidate = parsedMessage.iceCandidate;
                    await PC?.addIceCandidate(iceCandidate);
                    console.log("candidate recieved")
                }
              else{
                console.log("recieved all the candidates");
              }
            }
        }
      }
    }, [socket, connected])



    const handleMessage = async() => {
       if(!socket || !PC){
        console.log("no socket")
        return
       }

       console.log("user connected")

       PC.onicecandidate = (event) => {
        console.log("these are cands : ",event.candidate);
        const candidate = event.candidate
        if(candidate){
            socket.send(JSON.stringify({type : "candidate", candidate}))
        }
        else {
            console.log("all ice candidates sent")
        }
       
    }



        PC.onnegotiationneeded = async() => {
            console.log("on negotiation");
            const offer = await PC!.createOffer();
            await PC.setLocalDescription(offer);

            console.log(offer)
    
            const type = PC.localDescription?.type 
            const sdp = PC.localDescription?.sdp
    
            socket.send(JSON.stringify({
                type : type,
                sdp : sdp
            }))
    
          }

          

          const stream =  await window.navigator.mediaDevices.getUserMedia({video : true, audio : false})
          const LocalVid = document.getElementById("Localvid") as HTMLVideoElement;
            if(stream && LocalVid){
                console.log("stream sent")
                PC.addTrack(stream.getVideoTracks()[0]);
                LocalVid.srcObject = new MediaStream(stream)
            }

        
   
    }

    return (
        <>

        <video id="vid"  autoPlay
        playsInline
        style={{ width: "50%", height: "auto", background: "black" }}></video>

<video id="Localvid"  autoPlay
        playsInline
        style={{ width: "50%", height: "auto", background: "black" }}></video>

        <button onClick={handleMessage}> 
            join
        </button>
        
        </>
    )
} 
import { useEffect, useState } from "react";

const useSocket = () => {

const [socket, setSocket] = useState<WebSocket | null>(null)
const [connected , setConnected] = useState<boolean>(false)



useEffect(()=> {
 
const ws = new WebSocket("ws://localhost:8000")

ws.onopen = () => {
    setSocket(ws)
    setConnected(true)
    console.log("socket connected");
}

ws.onclose = () => {
    setConnected(false)
    setSocket(null)
}


},[])

return {socket, connected} ;


}

export default useSocket;
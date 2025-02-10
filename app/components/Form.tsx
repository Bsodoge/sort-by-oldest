'use client'

import { FormEvent,  useState } from "react"
import loading from "../../public/loading.gif"
import Image from "next/image";

export default function Form({ setComments }: any) {
    const [link, setLink] = useState("");
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError(false);
            setLoad(true);
            let re = /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
            let videoId = link.match(re)![8]; //https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url/51870158#51870158
            if(!videoId) {
                setError(true);
                setLoad(false);
                return;
            }
            setLoad(true);
            const response = await fetch("/api/getComments", {
                method: "POST",
                body: JSON.stringify({link})
            });
            setLoad(false);
            const { allComments }= await response.json();
            setComments(allComments);
            console.log(allComments)
        } catch (error) {
            setError(true);   
            setLoad(false); 
        }
    }
    return (
        <form onSubmit={submit} className="flex flex-col w-[20rem] min-h-20 max-h-40 gap-4">
            { 
                error ? 
                <div className="bg-[#a93630] border-[#a11b1b] text-white px-1 py-2 flex items-center gap-4 rounded-sm">
                    <div className="error-icon"></div>
                    <span>Please enter a valid youtube URL</span>
                </div> 
                : <></> 
            }
            <input type="text" value={link} onChange={e => setLink(e.target.value)} className="text-black py-2 px-2 border-[#dedede] border-2 text-lg" required />
            { load ? <Image height={30} width={30} src={loading} alt="loading" className="self-center"/> : <button className="button">Retrieve comments</button> }
        </form>
    )
}

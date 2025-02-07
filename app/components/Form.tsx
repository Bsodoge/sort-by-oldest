'use client'

import { FormEvent,  useState } from "react"

export default function Form({ setComments }: any) {
    const [link, setLink] = useState("");
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError(false);
            let re = /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
            let videoId = link.match(re)![8]; //https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url/51870158#51870158
            if(!videoId) {
                setError(true);
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
        } catch (error) {
            setError(true);    
        }
    }
    return (
        <form onSubmit={submit} className="flex flex-col w-[20rem] h-20">
            { error ? <span className="text-center">Please enter a valid youtube URL</span> : <></> }
            <input type="text" value={link} onChange={e => setLink(e.target.value)} className="text-black" required />
            { load ? <></> : <button className="button">Retrieve comments</button> }
        </form>
    )
}

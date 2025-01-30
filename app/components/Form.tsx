'use client'

import { FormEvent, FormEventHandler, useState } from "react"

export default function Form() {
    const [link, setLink] = useState("");
    const [load, setLoad] = useState(false);
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);
        const response = await fetch("/api/getComments", {
            method: "POST",
            body: JSON.stringify({videoId: link})
        });
        setLoad(false);
        console.log(response)
    }
    return (
        <form onSubmit={submit} className="flex flex-col">
            <input type="text" value={link} onChange={e => setLink(e.target.value)} className="text-black" required />
            { load ? <></> : <button>Retrieve comments</button> }
        </form>
    )
}

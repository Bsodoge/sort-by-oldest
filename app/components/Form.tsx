'use client'

import { useState } from "react"

export default function Form() {
    const [link, setLink] = useState("");
    const submit = (args: any) => {
        console.log(args)
    }
    return (
        <form onSubmit={submit} className="flex flex-col">
            <input type="text" value={link} onChange={e => setLink(e.target.value)} required />
            <button>Retrieve comments</button>
        </form>
    )
}

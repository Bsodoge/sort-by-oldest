export default function Comment({ content, publishedAt, author, likes, profileImage }: any) {
    return(
        <div className="flex gap-8 w-1/2 border p-4">
            <div>
                <img src={profileImage} alt="No Profile Found" className="h-24 max-w-24"/>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex">
                    <div className="">{ author }</div>
                    <div className="">{ publishedAt }</div>
                </div>
                <div className="">
                    <div className="">{ content }</div>
                </div>
                <div className="flex gap-4">
                    <div className="">{ likes } likes</div>
                    <div className="">replies</div>
                </div>
            </div>
        </div>
    )
}
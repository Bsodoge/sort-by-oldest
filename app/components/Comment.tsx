import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";

export default function Comment({ content, publishedAt, author, likes, profileImage }: any) {
    dayjs.extend(relativeTime);
    return(
        <div className="flex gap-8 border p-4 w-1/2 max-w-3/4">
            <div>
                <Image width={64} height={64} src={profileImage} alt="No Profile Found" />
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-2">
                    <div className="">{ author }</div>
                    <div className="">{ dayjs(publishedAt).fromNow() }</div>
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
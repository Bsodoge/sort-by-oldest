import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { convert } from "html-to-text";
import Image from "next/image";

export default function Comment({ content, publishedAt, author, likes, profileImage }: any) {
    dayjs.extend(relativeTime);
    return(
        <div className="flex gap-8 bg-white border p-4 box-content sm:w-3/4 ">
            <div>
                <Image width={64} height={64} src={profileImage} alt="No Profile Found"/>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex gap-2">
                    <a href={`https://www.youtube.com/${author}`} target="_blank" className="text-[#438bc5] hover:underline hover:cursor-pointer font-bold">{ author }</a>
                    <div className="text-[#999]">{ dayjs(publishedAt).fromNow() }</div>
                </div>
                <div className="">
                    <div className="text-[#333]">{ convert(content) }</div>
                </div>
                <div className="flex text-[#999] gap-4">
                    <div className="font-bold">Reply</div>
                    <span className="font-bold">·</span>
                    <div className="text-[#090] flex gap-2 items-center">{ likes ? likes : "" } <div className="thumbs_up icons"></div></div>
                </div>
            </div>
        </div>
    )
}
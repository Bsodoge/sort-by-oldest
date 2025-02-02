export default function Comment({ content, publishedAt, author, likes, profileImage }: any) {
    return(
        <div className="">
            <div className="">
                <img src={profileImage} alt="profile" />
                <div className="">
                    <div className="">
                        <div className="">{ author }</div>
                        <div className="">{ publishedAt }</div>
                    </div>
                    <div className="">
                        <div className="">{ content }</div>
                    </div>
                    <div className="">
                        <div className="">{ likes }</div>
                        <div className="">replies</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
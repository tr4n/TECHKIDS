import React from 'react';

const Video = (props) => {
    return (
        <div >
            {
                props.items.map(item => {
                    // const href = `https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`;
                    return (
                        <div className="my-1 z-index-1">
                            <hr />
                            <a className="result col-md-12 d-flex justify-content-start" href={`https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`} target="_blank">
                                <img src={item.snippet.thumbnails.high.url} alt="" />
                                <div className="video_info my-auto text-left ml-3">
                                    <h2 className="title"> {item.snippet.title}</h2>
                                    <p className="description"> {item.snippet.description}</p>
                                    <span>View >> </span>

                                </div>
                            </a>

                        </div>

                    )

                })

            }
        </div>
    );


}
export default Video; 
import React, { memo } from 'react';
import YouTube from 'react-youtube';

const YoutubeEmbed = ({ embedId }) => {
  const opts = {
    height: '100',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  };
  return (
    // <YouTube
    //   videoId={embedId}
    //   opts={opts}
    //   className="unisatSS_container"
    // />
    <iframe
    className='pr-4'
      width="100%"
      src="https://player.vimeo.com/video/839731536"
      frameborder="0"
      allow="autoplay"
      allowFullScreen></iframe>
  );
};
export default memo(YoutubeEmbed);

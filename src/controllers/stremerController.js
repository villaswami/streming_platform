const streamModel = require('../models/stremer');

const getStreamByContentId = (req, res) => {
  const { contentId } = req.params;
  const { quality = 'auto', language, episode } = req.query;


 

  streamModel.getStreamData(contentId, episode, (err, streamData) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch stream data' });

    // Mocking URL and DRM
    const videoUrl = `https://stream.hotstar.com/${contentId}${episode ? `/ep_${episode}` : ''}_${quality}.mp4`;
    const drmToken = `drm_${contentId}_${Date.now()}`;

    const response = {
      success: true,
      stream: {
        videoUrl,
        quality,
        audioTracks: streamData.audio.map(lang => ({
          language: lang,
          url: `https://stream.hotstar.com/audio/${lang.toLowerCase()}.mp3`
        })),
        // subtitles: streamData.subtitle.map(lang => ({
        //   language: lang,
        //   url: `https://stream.hotstar.com/subtitles/${lang.toLowerCase()}.vtt`
        // })),
        drmToken,
        duration: streamData.duration || 7200
      }
    };

    res.json(response);
  });
};

const getSportsStream = (req, res) => {
  const { sport } = req.body;
  console.log(sport);

  streamModel.getSportsDetails(sport, (err, sportsData) => {
    if (err) {console.log(err); return res.status(500).json({ error: 'Failed to fetch sports data' });}

    const response = {
      success: true,
      sports: sportsData,
      streamUrl: "live_stream_url",
       scorecardUrl: `/api/${sport}/${sportsData.id}/scorecard`
    };

    res.json(response);
  });
};

module.exports = { getStreamByContentId, getSportsStream };

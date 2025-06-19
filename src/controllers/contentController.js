const constent= require('../models/content');

const getContentByID = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: 'Content ID is required' });
  }

  constent.getContentByID(id, (err, contents) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).send({ error: 'Failed to fetch content' });
    }
    if (!contents) {
      return res.status(404).send({ error: 'Content not found' });
    }
    //destructuring content object to remove sensitive data
    const { content, languages } = contents;
    res.send({ success: true, content, languages });
  });
}

const getSeasonsByContentID = (req, res) => {
  const { contentId } = req.params;

  if (!contentId) {
    return res.status(400).send({ error: 'Content ID is required' });
  }

  constent.getSeasonsBYContentID(contentId, (err, seasons) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).send({ error: 'Failed to fetch seasons' });
    }
    if (!seasons) {
      return res.status(404).send({ error: 'Seasons not found' });
    }
    res.send({ success: true, seasons });
  });
}

module.exports = { getContentByID, getSeasonsByContentID };
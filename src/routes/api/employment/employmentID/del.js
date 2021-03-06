// Mongoose model imports
const Employments = require('../../../../models/Employments');

// Module export
module.exports = (req, res) => {
  const { employmentID } = req.params;

  return Employments.findById(employmentID)
    .then((data) => {
      if (data === null || (data && data.isDeleted === true)) {
        res.status(404).send({
          data: null,
          message: 'Employment not found',
          error: true
        });
      }
      Employments.findByIdAndUpdate(employmentID, { isDeleted: true }, { upsert: false })
        .then(() => res.status(200).send({
          data,
          message: 'Employment deleted successfully',
          error: false
        }))
        .catch((err) => res.status(500).send({
          data: null,
          message: err,
          error: true
        }));
    })
    .catch((err) => res.status(500).send({
      data: null,
      message: err,
      error: true
    }));
};

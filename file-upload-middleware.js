const axios = require("axios");
const cloudinary = require("cloudinary");

function fileUploadMiddleware(req, res) {
  // console.log(`Trying Cloudinary upload.`);

  cloudinary.uploader
    .upload_stream(result => {
      // console.log(`${req.headers.origin}/api/post/create`);
      axios({
        url: `${req.headers.origin}api/post`, //API endpoint that needs file URL from CDN
        method: "post",
        data: {
          picture: result.secure_url,
          goalID: req.body.goalID,
          userID: req.body.userID,
          text: req.body.text
        }
      })
        .then(response => {
          // you can handle external API response here
          res.status(200).json({ success: true, fileUrl: result.secure_url });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json(error.response.data);
        });
    })
    .end(req.file.buffer);
}

module.exports = fileUploadMiddleware;

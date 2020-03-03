// const express = require("express");
// const multer = require("multer");
// const app = express();

// const storage = multer.diskStorage({
//   destination: "./profile/uploads",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 4 * 1024 * 1024
//   },
//   fileFilter: function(req, res, cb) {
//     checkFileType(file, cb);
//   }
// }).single("myImage");

// //Check file type - return error message if wrong
// function checkFileType(file, cb) {
//   //Files allowed to upload
//   const filetypes = /jpeg|png|jpg|gif/;

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

// app.post("/profiles/upload", (req, res) => {
//   upload(req, res, err => {
//     if (err) {
//       res.render("index", {
//         msg: err
//       });
//     }
//   });
// });

// module.exports.upload = upload;

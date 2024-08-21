const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = path.join("public", file.fieldname)
    console.log(folder);



    fs.mkdir(folder, { recursive: true }, (error) => {
      if (error) {
        cb(error)
      }
      cb(null,folder)
    });

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname  + '-' +uniqueSuffix+ path.extname(file.originalname) )
  }
})

const upload = multer({ storage: storage })

module.exports = upload 
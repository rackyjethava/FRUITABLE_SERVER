
const path = require('path');
const pdfmake = (req, res) => {
    var fs = require('fs');
    var PdfPrinter = require('pdfmake');

    var fonts = {
        Roboto: {
            normal: fs.readFileSync(path.join(__dirname, '../../public/fonts/Roboto-Black.ttf')),
        }
    };

    var printer = new PdfPrinter(fonts);

    var docDefinition = {
        content: [
            'pdfmake (since it\'s based on pdfkit) supports JPEG and PNG format',
            'If no width/height/fit is provided, image original size will be used',
            {
                image: path.join(__dirname, '../../public/image/jpeg_43-2.jpg'),
                width: 150,
                height: 150,
            }
        ]
    };

    console.log(path.join(__dirname, '../../public/image/jpeg_43-2.jpg'), "Image path");

    var options = {}

    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    var outputPath = path.join(__dirname, '../../public/pdfs/image.pdf'); 
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();

    pdfDoc.on('end', () => {
        res.status(200).sendFile(outputPath);
    });
}

module.exports = pdfmake;





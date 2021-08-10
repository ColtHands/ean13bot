const generateBarcodeSvgText = require('./generateBarcodeSvgText.js')
const sharp = require('sharp')

const generateBarcodeImg = code => {
    const buffer = Buffer.from(
        generateBarcodeSvgText(code)
    )

    const pngImg = sharp(buffer)
        .png()

    return pngImg
}

module.exports = generateBarcodeImg
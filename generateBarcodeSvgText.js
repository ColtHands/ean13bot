const JsBarcode = require('jsbarcode')
const { DOMImplementation, XMLSerializer } = require('xmldom')
const xmlSerializer = new XMLSerializer()
const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null)
const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

const generateBarcodeSvgText = code => {
    JsBarcode(svgNode, code, {
        format: 'EAN13',
        xmlDocument: document
    })
    
    const svgText = xmlSerializer.serializeToString(svgNode)

    return svgText
}

module.exports = generateBarcodeSvgText
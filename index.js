const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const path = require('path')
const generateBarcodeSvgText = require('./generateBarcodeSvgText.js')
const generateBarcodeImg = require('./generateBarcodeImg.js')

const token = '1918515258:AAEBLTdsvPqkuZVXjxB06F6iSYH-sR38UiY'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', async msg => {
    console.log('msg', msg)

    const chatId = msg.chat.id
    // const msgId = msg.message_id

    const pngFileName = `${chatId}_${msg.text}.png`
    const fullPngFilePath = path.join('storage', pngFileName)
    const barcodeImg = await generateBarcodeImg(msg.text).toFile(fullPngFilePath)
    
    const svgFileName = `${chatId}_${msg.text}.svg`
    const fullSvgFilePath = path.join('storage', svgFileName)
    const barcodeSvgText = generateBarcodeSvgText(msg.text)

    console.log('barcodeImg', barcodeImg)

    fs.writeFile(fullSvgFilePath, barcodeSvgText, 'UTF-8', err => {
        console.log(err)
    })
    
    bot.sendPhoto(chatId, fullPngFilePath)
    bot.sendDocument(chatId, fullSvgFilePath)

    fs.unlink(fullSvgFilePath, err => {
        console.log(err)
    })

    fs.unlink(fullPngFilePath, err => {
        console.log(err)
    })

    // bot.sendMessage(chatId, msg.text)
})

// bot.onText(/\/echo (.+)/, (msg, match) => {
//     const chatId = msg.chat.id
//     const resp = match[1]

//     bot.sendMessage(chatId, resp)
// })
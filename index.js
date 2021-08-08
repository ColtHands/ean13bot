const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const path = require('path')
const generateBarcodeSvgText = require('./generateBarcodeSvgText.js')

const token = '1918515258:AAEBLTdsvPqkuZVXjxB06F6iSYH-sR38UiY'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', async msg => {
    console.log('msg', msg)

    const chatId = msg.chat.id
    const msgId = msg.message_id
    const fileName = `${chatId}_${msg.text}.svg`
    const fullFilePath = path.join('storage', fileName)
    const barcodeSvgText = generateBarcodeSvgText(msg.text)

    fs.writeFile(fullFilePath, barcodeSvgText, 'UTF-8', err => {
        console.log(err)
    })
    
    bot.sendDocument(chatId, fullFilePath)

    fs.unlink(fullFilePath, err => {
        console.log(err)
    })

    // bot.sendMessage(chatId, msg.text)
})

// bot.onText(/\/echo (.+)/, (msg, match) => {
//     const chatId = msg.chat.id
//     const resp = match[1]

//     bot.sendMessage(chatId, resp)
// })
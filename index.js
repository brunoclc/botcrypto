
require('dotenv').config();

const venom = require('venom-bot');
const WebSocket = require('ws');
const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1h');

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_TOKEN_HTTP_API);

venom
.create()
.then((client) => start(client));

let valorVenda = 0;
let valorCompra  = 0;
console.log('Inicializando...');

function start(client) {

    ws.onmessage = (event) => {
        console.log('Conectado');
        const data = JSON.parse(event.data);
        const valor = parseFloat(data.k.c);
        console.log('Valor atual: ' + valor);
        console.log('Alvo para Compra, menor ou igual a: ' + valorCompra);
        console.log('Alvo para venda, maior ou igual a: ' + valorVenda);
        console.log('Aguardando Entrada!');

        if (valor >= venda){
            
            Vender(valor);
            
        } else if (valor <= compra ){ 
            
            Comprar(valor);
        }

    };

    function Vender (valor){
        client
        .sendText(process.env.WHATSAPP_NUMBER + '@c.us', 'Olá! Tudo bem com você? Venda sua Cripto!')
        .then((result) => {
        console.log('Resultado: ', result.status);
        })
        .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro);
        });
        bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_UPDATE_ID, 'Vender!')
        console.log ('Vender!')

    };

    function Comprar (valor){

        client.sendText(process.env.WHATSAPP_NUMBER + '@c.us', 'Olá! Tudo bem com você? Compre sua Cripto!')
            .then((result) => {
                console.log('Result: ', result.status);
            })
            .catch((erro) => {
                console.error('Erro ao enviar mensagem: ', erro);
            });
            bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_UPDATE_ID, 'Comprar!')
            console.log('Comprar') 
    };
}
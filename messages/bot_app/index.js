var TelegramBot = require('node-telegram-bot-api');
var Web3 = require('web3');
var web3 = new Web3();

var createUser =  require('./dao.js');
var createSubscription =  require('./dao.js');
var checkAddress =  require('./dao.js');

// replace the value below with the Telegram token you receive from @BotFather
var token = '303588402:AAFXsdS80092iUkLsdO7cg5CjBRkyibnJMM';

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });

bot.onText(/test/, function (msg, match) {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    var chatId = msg.chat.id;

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, 'test compited');
});

bot.onText(/start/, function (msg, match) {

    var chatId = msg.chat.id;
    createUser(chatId);

    bot.sendMessage(chatId, 'You started your eth-bot');
});


bot.onText(/subscribe (.+)/, function (msg, match) {

    var chatId = msg.chat.id;
    createSubscription(chatId, match[1]);

    bot.sendMessage(chatId, `You subscribed by transactions to ${match[1]} address`);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', function (msg) {
//     var chatId = msg.chat.id;
//
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, "Received your message");
// });


web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

checkAddress('0x9e0b9ddba97dd4f7addab0b5f67036eebe687606').then(result => console.log(result));

function getBlockHash(block) {
    var getBlockHash = new Promise((resolve, reject) => {
        resolve(web3.eth.getBlock(block).transactions);
    });
    getBlockHash
        .then(transactions =>
            transactions.forEach(transaction => console.log(web3.eth.getTransaction(transaction)))
        );
}

// var filter = web3.eth.filter('latest');
// filter.watch(function (error, log) {
//     if (log) {
//         getBlockHash(log);
//     }
// });

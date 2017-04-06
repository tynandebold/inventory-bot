var Xray = require('x-ray');
var x = Xray();

x('http://www.apple.com/shop/browse/home/specialdeals/mac/macbook_pro/13', {
  reporter: 'head > title',
  inventory: x('.box-content > table',
    [{
      title: '.specs > h3 > a',
      specs: '.specs',
      price: '.current_price > span'
    }])
  })(function(err, obj){
    var inventory = obj.inventory;
    var titles = [];

    inventory.forEach(function (item){
      titles.push(item.title);
    });

    var cleanedItems = titles.map(function(title){
      return title.trim();
    });

    // cleanedItems.forEach(function (title){
    //   console.log(title);
    // });
  });

module.exports = function(controller) {

  // listen for someone saying 'inventory' to the bot
  controller.hears(['inventory'], 'direct_message', function(bot, message) {

    cleanedItems.forEach(function (title){
      bot.reply(message, title);
    });
  });
}
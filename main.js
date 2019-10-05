"use strict";
const Alexa = require('alexa-sdk');
// ステートの定義
const states = {
                  SYNASTRYMODE: '_SYNASTRYMODE'
                  ,BELONGMODE: '_BELONGMODE'
                };
// メッセージ
const STOP_MESSAGE ='承知いたしました。';
const START_MESSAGE ='いらっしゃいませ、*****へようこそ！僕の名前は***君です。お名前をフルネームで教えてください';
//const RESEPT_TEXT = '来客情報';
exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  // alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(handlers,BelongHandlers); // 既存のハンドラに加えてステートハンドラ(後半で定義)も登録
  alexa.execute();
};
var handlers = {
'LaunchRequest': function () {
this.emit('AMAZON.HelpIntent');
},
'AMAZON.HelpIntent': function () {
this.emit(':ask', START_MESSAGE);
},
'InputReceptionName': function () {
var ReceptionName = this.event.request.intent.slots.ReceptionName.value;
this.handler.state = states.SYNASTRYMODE; // ステートをセット
this.attributes['ReceptionName'] = ReceptionName; // 名前をセッションアトリビュートにセット
var message = ReceptionName + '様ですね。つぎに会社名または学校名を教えてください';
this.emit(':ask', message); // 
console.log(message);
},
// 「キャンセル」とか言ったときの処理
"AMAZON.CancelIntent": function () {
   const speechOutput =STOP_MESSAGE;
  this.emit(":tell", speechOutput);
},
// 「ストップ」とか言ったときの処理
"AMAZON.StopIntent": function () {
    const speechOutput = STOP_MESSAGE;
    this.emit(":tell", speechOutput);
}
};
// ステートハンドラの定義
var BelongHandlers = Alexa.CreateStateHandler(states.SYNASTRYMODE, {
'InputBelongName': function () {
var ReceptionName = this.attributes['ReceptionName'] ;
var BelongName = this.event.request.intent.slots.BelongName.value;
var message = '二次面接でおこしの'+BelongName+'、'+ ReceptionName +'様ですね。お繋ぎいたしますので少々お待ちください。';
//var appliMessage = '要件:二次面接、' + '所属:'+ BelongName +'、名前:' + ReceptionName ;
const RESEPT_TEXT = '来客情報';
//this.emit(':tellWithCard', message, '来客情報', appliMessage); 
this.emit(':tell', message);
console.log(message);
},
// 「キャンセル」とか言ったときの処理
"AMAZON.CancelIntent": function () {
   const speechOutput = STOP_MESSAGE;
  this.emit(":tell", speechOutput);
},
// 「ストップ」とか言ったときの処理
"AMAZON.StopIntent": function () {
    const speechOutput = STOP_MESSAGE;
    this.emit(":tell", speechOutput);
},
'Unhandled': function() {
var reprompt = '会社名または学校名を教えてください';
this.emit(':ask', reprompt);
}
});
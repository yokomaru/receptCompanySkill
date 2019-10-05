"use strict";
const Alexa = require('alexa-sdk');
// �X�e�[�g�̒�`
const states = {
                  SYNASTRYMODE: '_SYNASTRYMODE'
                  ,BELONGMODE: '_BELONGMODE'
                };
// ���b�Z�[�W
const STOP_MESSAGE ='���m�������܂����B';
const START_MESSAGE ='��������Ⴂ�܂��A*****�ւ悤�����I�l�̖��O��***�N�ł��B�����O���t���l�[���ŋ����Ă�������';
//const RESEPT_TEXT = '���q���';
exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  // alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(handlers,BelongHandlers); // �����̃n���h���ɉ����ăX�e�[�g�n���h��(�㔼�Œ�`)���o�^
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
this.handler.state = states.SYNASTRYMODE; // �X�e�[�g���Z�b�g
this.attributes['ReceptionName'] = ReceptionName; // ���O���Z�b�V�����A�g���r���[�g�ɃZ�b�g
var message = ReceptionName + '�l�ł��ˁB���ɉ�Ж��܂��͊w�Z���������Ă�������';
this.emit(':ask', message); // 
console.log(message);
},
// �u�L�����Z���v�Ƃ��������Ƃ��̏���
"AMAZON.CancelIntent": function () {
   const speechOutput =STOP_MESSAGE;
  this.emit(":tell", speechOutput);
},
// �u�X�g�b�v�v�Ƃ��������Ƃ��̏���
"AMAZON.StopIntent": function () {
    const speechOutput = STOP_MESSAGE;
    this.emit(":tell", speechOutput);
}
};
// �X�e�[�g�n���h���̒�`
var BelongHandlers = Alexa.CreateStateHandler(states.SYNASTRYMODE, {
'InputBelongName': function () {
var ReceptionName = this.attributes['ReceptionName'] ;
var BelongName = this.event.request.intent.slots.BelongName.value;
var message = '�񎟖ʐڂł�������'+BelongName+'�A'+ ReceptionName +'�l�ł��ˁB���q���������܂��̂ŏ��X���҂����������B';
//var appliMessage = '�v��:�񎟖ʐځA' + '����:'+ BelongName +'�A���O:' + ReceptionName ;
const RESEPT_TEXT = '���q���';
//this.emit(':tellWithCard', message, '���q���', appliMessage); 
this.emit(':tell', message);
console.log(message);
},
// �u�L�����Z���v�Ƃ��������Ƃ��̏���
"AMAZON.CancelIntent": function () {
   const speechOutput = STOP_MESSAGE;
  this.emit(":tell", speechOutput);
},
// �u�X�g�b�v�v�Ƃ��������Ƃ��̏���
"AMAZON.StopIntent": function () {
    const speechOutput = STOP_MESSAGE;
    this.emit(":tell", speechOutput);
},
'Unhandled': function() {
var reprompt = '��Ж��܂��͊w�Z���������Ă�������';
this.emit(':ask', reprompt);
}
});
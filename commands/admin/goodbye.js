/**
 * أمر وداع - ستايل لوسيفر 😈
 * تفعيل/تعطيل رسائل وداع الجروب
 */

const db = require('../../database');

module.exports = {
  name: 'رساله_الوداع',                     
  aliases: ['وداع_تشغيل', 'وداع_ايقاف'], 
  category: 'admin',
  desc: 'تشغيل أو إيقاف رسائل وداع الجروب', 
  usage: '.وداع تشغيل/ايقاف',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  execute: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;
      const action = args[0]?.toLowerCase();
      
      if (!action || !['تشغيل', 'ايقاف'].includes(action)) {
        const groupSettings = db.getGroupSettings(groupId);
        const status = groupSettings.goodbye ? 'مفعل 😎' : 'معطل 😴';
        return await sock.sendMessage(groupId, {
          text: `👋 *حالة رسائل وداع الجروب*\n\n` +
                `الحالة: ${status}\n` +
                `الرسالة: ${groupSettings.goodbyeMessage || 'مفيش رسالة اتضبطت لسه 😅'}\n\n` +
                `الاستخدام: .وداع تشغيل/ايقاف\n` +
                `لتخصيص الرسالة: .setgoodbye <الرسالة> 😈`
        }, { quoted: msg });
      }
      
      const enable = action === 'تشغيل';
      db.updateGroupSettings(groupId, { goodbye: enable });
      
      await sock.sendMessage(groupId, {
        text: `✅ تمام يا معلم، تم ${enable ? 'تفعيل' : 'تعطيل'} رسائل الوداع 😎` +
              `${enable ? '\n\nالأعضاء اللي هيمشوا من الجروب دلوقتي هيستقبلوا رسالة وداع 😈' : ''}`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('خطأ في أمر وداع:', error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ يا معلم حصلت غلطة: ${error.message} 😢`
      }, { quoted: msg });
    }
  }
};
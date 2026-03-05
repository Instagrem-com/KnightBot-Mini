/**
 * أمر تعيين رسالة وداع - ستايل لوسيفر 😈
 * تحديد رسالة مخصصة عند مغادرة عضو
 */

const db = require('../../database');

module.exports = {
  name: 'تعيين_رسالة_الوداع',
  aliases: ['setgoodbye', 'goodbyetext'],
  category: 'admin',
  desc: 'تعيين رسالة وداع مخصصة للجروب 😎',
  usage: '.تعيين_رسالة_الوداع <الرسالة> (استخدم @user لعمل منشن للعضو)',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  execute: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;
      
      if (!args.length) {
        const groupSettings = db.getGroupSettings(groupId);
        return await sock.sendMessage(groupId, {
          text: `👋 *رسالة وداع الجروب*\n\n` +
                `الرسالة الحالية:\n${groupSettings.goodbyeMessage || 'لم يتم ضبط رسالة بعد 😅'}\n\n` +
                `💡 طريقة الاستخدام:\n` +
                `.تعيين_رسالة_الوداع <الرسالة>\n` +
                `ملاحظة: استخدم @user لعمل منشن للعضو الذي غادر.`
        }, { quoted: msg });
      }
      
      const goodbyeMessage = args.join(' ');
      
      if (goodbyeMessage.length > 500) {
        return await sock.sendMessage(groupId, {
          text: '❌ الرسالة طويلة جدًا! الحد الأقصى 500 حرف.'
        }, { quoted: msg });
      }
      
      db.updateGroupSettings(groupId, { goodbyeMessage });
      
      await sock.sendMessage(groupId, {
        text: `✅ تم تحديث رسالة الوداع بنجاح 😈\n\n` +
              `📄 المعاينة:\n${goodbyeMessage.replace('@user', '@' + msg.key.participant.split('@')[0])}`,
        mentions: [msg.key.participant]
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Set Goodbye Error:', error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ حصل خطأ أثناء تنفيذ الأمر:\n${error.message}`
      }, { quoted: msg });
    }
  }
};
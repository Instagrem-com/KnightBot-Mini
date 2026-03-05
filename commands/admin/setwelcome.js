/**
 * أمر تعيين رسالة ترحيب - ستايل لوسيفر 😈
 * تحديد رسالة ترحيب مخصصة للأعضاء الجدد
 */

const db = require('../../database');

module.exports = {
  name: 'تعيين_رساله_الترحيب',
  aliases: ['setwelcome', 'welcometext'],
  category: 'admin',
  desc: 'تعيين رسالة ترحيب مخصصة للجروب 😎',
  usage: '.تعيين_الترحيب <الرسالة> (استخدم @user لعمل منشن للعضو الجديد)',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  execute: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;
      
      if (!args.length) {
        const groupSettings = db.getGroupSettings(groupId);
        return await sock.sendMessage(groupId, {
          text: `👋 *رسالة الترحيب بالجروب*\n\n` +
                `الرسالة الحالية:\n${groupSettings.welcomeMessage || 'لم يتم ضبط رسالة بعد 😅'}\n\n` +
                `💡 طريقة الاستخدام:\n` +
                `.تعيين_رساله_الترحيب <الرسالة>\n` +
                `ملاحظة: استخدم @user لعمل منشن للعضو الجديد.`
        }, { quoted: msg });
      }
      
      const welcomeMessage = args.join(' ');
      
      if (welcomeMessage.length > 500) {
        return await sock.sendMessage(groupId, {
          text: '❌ الرسالة طويلة جدًا! الحد الأقصى 500 حرف.'
        }, { quoted: msg });
      }
      
      db.updateGroupSettings(groupId, { welcomeMessage });
      
      await sock.sendMessage(groupId, {
        text: `✅ تم تحديث رسالة الترحيب بنجاح 😈\n\n` +
              `📄 المعاينة:\n${welcomeMessage.replace('@user', '@' + msg.key.participant.split('@')[0])}`,
        mentions: [msg.key.participant]
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Set Welcome Error:', error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ حصل خطأ أثناء تنفيذ الأمر:\n${error.message}`
      }, { quoted: msg });
    }
  }
};
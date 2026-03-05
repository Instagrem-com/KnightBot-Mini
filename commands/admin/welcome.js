/**
 * أمر رسالة الترحيب - تفعيل/تعطيل الرسائل
 */

const db = require('../../database');

module.exports = {
  name: 'رسالة_الترحيب',
  aliases: ['ترحيب_تشغيل', 'ترحيب_ايقاف'],
  category: 'admin',
  desc: 'تفعيل أو تعطيل رسائل الترحيب للجروب',
  usage: '.رسالة_الترحيب تفعيل & تغطيل',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  execute: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;
      const action = args[0]?.toLowerCase();
      
      // لو المستخدم كتبش on/off نعرض الحالة الحالية
      if (!action || !['تفعيل', 'تعطيل'].includes(action)) {
        const groupSettings = db.getGroupSettings(groupId);
        const status = groupSettings.welcome ? 'مفعل ✅' : 'معطل ❌';
        return await sock.sendMessage(groupId, {
          text: `👋 أهلاً وسهلاً في الجروب ✨\n\n` +
                `الحالة الحالية: ${status}\n` +
                `رسالة الترحيب: ${groupSettings.welcomeMessage || 'لم يتم ضبط رسالة بعد'}\n\n` +
                `الاستخدام: .ترحيب on/off\n` +
                `لتعديل الرسالة: .setwelcome <رسالتك>\n` +
                `ملاحظة: استخدم @user لعمل منشن للعضو الجديد`
        }, { quoted: msg });
      }
      
      // تشغيل أو تعطيل الرسائل
      const enable = action === 'تفعيل';
      db.updateGroupSettings(groupId, { welcome: enable });
      
      await sock.sendMessage(groupId, {
        text: `✅ تم ${enable ? 'تفعيل' : 'تعطيل'} رسائل الترحيب!\n` +
              `${enable ? 'الأعضاء الجداد دلوقتي هيستقبلوا رسالة ترحيب 😎' : ''}`
      }, { quoted: msg });
      
    } catch (error) {
      console.error('Welcome Error:', error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ حصل خطأ أثناء تنفيذ الأمر\n${error.message}`
      }, { quoted: msg });
    }
  }
};
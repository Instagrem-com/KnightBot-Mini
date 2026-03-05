/**
 * أمر مسح التحذيرات - ستايل لوسيفر 😈
 * حذف كل التحذيرات من عضو
 */

const database = require('../../database');

module.exports = {
  name: 'مسح_التحذيرات',
  aliases: ['resetwarn', 'resetwarning', 'clearwarn', 'unwarn', 'delwarn'],
  category: 'admin',
  description: 'مسح كل التحذيرات من عضو 😎',
  usage: '.مسح_التحذيرات @عضو',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      let target;
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      const mentioned = ctx?.mentionedJid || [];
      
      if (mentioned && mentioned.length > 0) {
        target = mentioned[0];
      } else if (ctx?.participant && ctx.stanzaId && ctx.quotedMessage) {
        target = ctx.participant;
      } else {
        return extra.reply(' اعمل منشن للشخص أو رد على رسالته عشان امسح التحذيرات.\nمثال: .مسح_التحذيرات @عضو');
      }
      
      const currentWarnings = database.getWarnings(extra.from, target);
      
      if (currentWarnings.count === 0) {
        return extra.reply(` العضو ده @${target.split('@')[0]} مفيهوش أي تحذيرات أصلا 😅`, { mentions: [target] });
      }
      
      database.clearWarnings(extra.from, target);
      
      await sock.sendMessage(extra.from, {
        text: `✅ تم مسح كل التحذيرات من العضو بنجاح! 😈\n\n` +
              `👤 المستخدم: @${target.split('@')[0]}\n` +
              `⚠️ عدد التحذيرات اللي كانت موجودة: ${currentWarnings.count}\n\n` +
              `التحذيرات اتصفرت تمام!`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      console.error('ResetWarn command error:', error);
      await extra.reply(`❌ حصل خطأ أثناء تنفيذ الأمر: ${error.message}`);
    }
  }
};
/**
 * أمر تحذير عضو - ⚠️
 */

const database = require('../../database');
const config = require('../../config');

module.exports = {
  name: 'تحذير',
  aliases: ['انذار'],
  category: 'admin',
  description: 'تحذير عضو في الجروب',
  usage: '.تحذير @user السبب',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      let target;
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      const mentioned = ctx?.mentionedJid || [];
      
      // تحديد العضو الهدف
      if (mentioned.length > 0) {
        target = mentioned[0];
      } else if (ctx?.participant && ctx.stanzaId && ctx.quotedMessage) {
        target = ctx.participant;
      } else {
        return extra.reply('❌ لازم تعمل منشن للعضو أو ترد على رسالته لتحذيره\n\nمثال: .تحذير @user كسر القوانين');
      }
      
      // سبب التحذير
      const reason = args.slice(mentioned.length > 0 ? 1 : 0).join(' ') || 'مفيش سبب محدد';
      
      // منع تحذير الأدمن
      const isAdmin = extra.groupMetadata.participants.some(
        p => (p.id === target || p.lid === target) && (p.admin === 'admin' || p.admin === 'superadmin')
      );
      if (isAdmin) {
        return extra.reply('❌ مينفعش تحذر أدمن في الجروب');
      }
      
      // إضافة التحذير في قاعدة البيانات
      const warnings = database.addWarning(extra.from, target, reason);
      
      // بناء رسالة التحذير
      let text = `⚠️ *تم تحذير العضو*\n\n`;
      text += `👤 العضو: @${target.split('@')[0]}\n`;
      text += `📌 السبب: ${reason}\n`;
      text += `🔢 التحذيرات: ${warnings.count}/${config.maxWarnings}\n\n`;
      
      // التحقق إذا وصل الحد الأقصى
      if (warnings.count >= config.maxWarnings) {
        text += '❌ العضو وصل لأقصى عدد تحذيرات وسيتم طرده من الجروب!';
        await sock.sendMessage(extra.from, { text, mentions: [target] }, { quoted: msg });
        
        if (extra.isBotAdmin) {
          await sock.groupParticipantsUpdate(extra.from, [target], 'remove');
          database.clearWarnings(extra.from, target);
        }
      } else {
        text += '⚠️ لو اتحذر مرة كمان هيتم طرده من الجروب';
        await sock.sendMessage(extra.from, { text, mentions: [target] }, { quoted: msg });
      }
      
    } catch (error) {
      console.error('تحذير عضو خطأ:', error);
      await extra.reply(`❌ حصل خطأ أثناء تنفيذ الأمر\n${error.message}`);
    }
  }
};
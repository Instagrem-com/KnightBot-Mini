/**
 * أمر تنزيل مشرف - ستايل لوسيفر 😈
 * إزالة صلاحيات الادمن من عضو
 */

const { findParticipant } = require('../../utils/jidHelper');

module.exports = {
  name: 'تنزيل_مشرف',                 
  aliases: ['طرد_يعرص'],       
  category: 'admin',
  description: 'نزل العضو من المشرفين', 
  usage: '.تنزيل @العضو',
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
        return extra.reply('❌ يا معلم، منشن العضو أو رد على رسالته عشان تنزله من المشرفين 😅\nمثال: .تنزيل @العضو');
      }
      
      const freshMetadata = await sock.groupMetadata(extra.from);
      const foundParticipant = findParticipant(freshMetadata.participants, target);
      
      if (!foundParticipant) {
        return extra.reply('❌ العضو مش موجود في الجروب 😢');
      }
      
      if (foundParticipant.admin !== 'admin' && foundParticipant.admin !== 'superadmin') {
        return extra.reply('❌ العضو ده مش مشرف 😎');
      }
      
      await sock.groupParticipantsUpdate(extra.from, [target], 'demote');
      
      await sock.sendMessage(extra.from, {
        text: `✅ تمام يا معلم، نزّلنا @${target.split('@')[0]} من المشرفين 😈`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      await extra.reply(`❌ حصلت غلطة يا معلم: ${error.message} 😢`);
    }
  }
};
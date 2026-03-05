/**
 * أمر رفع عضو - ستايل لوسيفر 😈
 * ترقية عضو ليصبح أدمن
 */

const { findParticipant } = require('../../utils/jidHelper');

module.exports = {
  name: 'رفع',
  aliases: ['اشراف', 'رول'],
  category: 'admin',
  description: 'ترقية عضو ليصبح أدمن 😈',
  usage: '.رفع @عضو',
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
        return extra.reply('👆 منشن الشخص أو اعمل رد على رسالته عشان ارفعه أدمن.\nمثال: .رفع @عضو');
      }
      
      const freshMetadata = await sock.groupMetadata(extra.from);
      const foundParticipant = findParticipant(freshMetadata.participants, target);
      
      if (!foundParticipant) {
        return extra.reply('❌ مش لاقي العضو ده في الجروب 😅');
      }
      
      if (foundParticipant.admin === 'admin' || foundParticipant.admin === 'superadmin') {
        return extra.reply('✅ الشخص ده أصلاً أدمن 😎');
      }
      
      await sock.groupParticipantsUpdate(extra.from, [target], 'promote');
      
      await sock.sendMessage(extra.from, {
        text: `يلا يعم @${target.split('@')[0]} هيص في الجروب 😈`,
        mentions: [target]
      }, { quoted: msg });
      
    } catch (error) {
      console.error('خطأ في أمر رفع العضو:', error);
      await extra.reply(`❌ حصل غلطة أثناء تنفيذ الأمر: ${error.message}`);
    }
  }
};
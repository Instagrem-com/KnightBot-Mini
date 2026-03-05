/**
 * أمر طرد - ستايل لوسيفر 😈
 * إزالة العضو من الجروب
 */

module.exports = {
  name: 'طرد',
  aliases: ['انطر', 'برا_يعرص'],
  category: 'admin',
  description: 'طرد الأعضاء المذكورين أو اللي اتعمل لهم رد من الجروب 😈',
  usage: '.طرد @user',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      const mentioned = ctx?.mentionedJid || [];
      let usersToKick = [];

      if (mentioned && mentioned.length > 0) {
        usersToKick = mentioned;
      } else if (ctx?.participant && ctx.stanzaId && ctx.quotedMessage) {
        usersToKick = [ctx.participant];
      }

      if (usersToKick.length === 0) {
        return extra.reply('يا معلم من فضلك منشن العضو أو رد على رسالته عشان أطرده 👀');
      }

      const botId = sock.user?.id || '';
      const botPhone = botId.includes('@') ? botId.split('@')[0] : botId;

      // منع طرد البوت نفسه
      const tryingToKickBot = usersToKick.some((jid) => jid.includes(botPhone));
      if (tryingToKickBot) {
        return extra.reply('❌ مش هقدر أطرد نفسي 😅');
      }

      await sock.groupParticipantsUpdate(chatId, usersToKick, 'remove');

      const mentions = usersToKick.map((jid) => `@${jid.split('@')[0]}`);
      const text = 'العرص دا اتطرد ${mentions.join(', ')} من الجروب بنجاح! 💀`;

      await sock.sendMessage(chatId, { text, mentions: usersToKick }, { quoted: msg });

    } catch (error) {
      console.error('خطأ في أمر الطرد:', error);
      await extra.reply('❌ فشل في طرد العضو/الأعضاء 😢، تأكد أني أدمن في الجروب.');
    }
  },
};
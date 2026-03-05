/**
 * رد تلقائي عالمي للبوت باستخدام رقم owner من الإعدادات
 */

const database = require('../../database');

module.exports = {
  name: 'رد_تلقائي',
  aliases: ['auto_reply_global'],
  category: 'owner',
  description: 'رد تلقائي على كلمات محددة، التحكم كامل لصاحب البوت',

  // الردود مخزنة داخل نفس الكود
  autoReplies: [
    { trigger: 'بوت', reply: 'اسمي لوسيفر' },
    { trigger: 'سلام', reply: 'وعليكم السلام ورحمة الله' }
  ],

  async execute(sock, msg, args, extra) {
    try {
      const textMsg = msg.message?.conversation?.toLowerCase();
      if (!textMsg) return;

      // جلب رقم صاحب البوت من الإعدادات
      const ownerNumber = database.getBotOwner(); // مثال: افترض عندك دالة تجيب الرقم من config

      // الردود التلقائية لأي رسالة
      for (let ar of this.autoReplies) {
        if (textMsg.includes(ar.trigger.toLowerCase())) {
          await sock.sendMessage(msg.key.remoteJid, { text: ar.reply });
          break;
        }
      }

      // إضافة رد جديد، **مقتصر على صاحب البوت**
      if (msg.key.participant === ownerNumber && args[0] && args[0].toLowerCase() === 'إضافة') {
        const input = args.join(' ').split('|');
        if (input.length < 3) return extra.reply('❌ صيغة خاطئة! استخدم: .رد_تلقائي إضافة | الكلمة | الرد');

        const trigger = input[1].trim();
        const replyText = input[2].trim();
        this.autoReplies.push({ trigger, reply: replyText });
        return extra.reply(`✅ تم إضافة رد تلقائي للكلمة: "${trigger}"`);
      }

    } catch (err) {
      console.error('[رد تلقائي] خطأ:', err);
    }
  }
};
/**
 * أمر الملصقات التلقائية - ستايل لوسيفر 😈
 */

const database = require('../../database');

module.exports = {
  name: 'ملصقات_تلقائية',
  aliases: ['ملصقات_اوكس', 'ملصق_تلقائي'],
  category: 'admin',
  description: 'تفعيل أو تعطيل التحويل التلقائي للصور والفيديوهات إلى ملصقات',
  usage: '.ملصقات_تلقائية <تفعيل/تعطيل>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: false,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.autosticker ? 'شغال' : 'مطفي';
        return extra.reply(
          `📌 حالة الملصقات التلقائية:\n` +
          `الحالة: *${status}* 😎\n\n` +
          `لو مفعل، كل الصور والفيديوهات اللي تتبعت هنا هتتحول تلقائيًا لملصقات 😈\n\n` +
          `طريقة الاستخدام:\n` +
          `  .ملصقات_تلقائية تفعيل 😎 - شغل التحويل التلقائي\n` +
          `  .ملصقات_تلقائية تعطيل 💤 - قفل التحويل التلقائي`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'تفعيل') {
        if (database.getGroupSettings(extra.from).autosticker) {
          return extra.reply('يا معلم، الملصقات التلقائية شغالة من زمان 😎');
        }
        database.updateGroupSettings(extra.from, { autosticker: true });
        return extra.reply('✅ تمام كده، الملصقات التلقائية اتفعلت 😈\n\nكل الصور والفيديوهات هتتحول لملصقات تلقائيًا!');
      }
      
      if (opt === 'تعطيل') {
        if (!database.getGroupSettings(extra.from).autosticker) {
          return extra.reply('يا معلم، الملصقات التلقائية كانت مطفية 😅');
        }
        database.updateGroupSettings(extra.from, { autosticker: false });
        return extra.reply('❌ تمام يا معلم، الملصقات التلقائية اتقفلت 💤');
      }
      
      return extra.reply('⚠️ مش خيار صح! استخدم: .ملصقات_تلقائية <تفعيل/تعطيل> 😅');
    } catch (error) {
      console.error('[أمر الملصقات التلقائية خطأ]:', error);
      return extra.reply('❌ حصل غلطة يا معلم 😢 أثناء تحديث إعدادات الملصقات التلقائية.');
    }
  }
};
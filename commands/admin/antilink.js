/**
 * أمر مكافحة الروابط - ستايل لوسيفر 😈
 */

const database = require('../../database');

module.exports = {
  name: 'مكافحة_الروابط',
  aliases: ['منع.اللينك'],
  category: 'admin',
  description: 'ضبط حماية الروابط (حذف/طرد)',
  usage: '.مكافحة_الروابط <تفعيل/تعطيل/ضبط/عرض>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? 'شغال' : 'مطفي';
        const action = settings.antilinkAction || 'حذف';
        return extra.reply(
          `🔗 حالة مكافحة الروابط:\n` +
          `الحالة: *${status}* 😎\n` +
          `الإجراء: *${action}* 🔥\n\n` +
          `طريقة الاستخدام:\n` +
          `  .مكافحة_الروابط تفعيل 😈 - شغل الحماية\n` +
          `  .مكافحة_الروابط تعطيل 💤 - قفل الحماية\n` +
          `  .مكافحة_الروابط ضبط حذف | طرد ⚡ - اختار الإجراء لما حد ينتهك\n` +
          `  .مكافحة_الروابط عرض 👀 - شوف الإعدادات`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'تفعيل') {
        if (database.getGroupSettings(extra.from).antilink) {
          return extra.reply('يا معلم، حماية الروابط شغالة من زمان 😎');
        }
        database.updateGroupSettings(extra.from, { antilink: true });
        return extra.reply('✅ تمام كده، حماية الروابط اتفعّلت 😈');
      }
      
      if (opt === 'تعطيل') {
        database.updateGroupSettings(extra.from, { antilink: false });
        return extra.reply('✅ تمام يا معلم، حماية الروابط اتقفلت 💤');
      }
      
      if (opt === 'ضبط') {
        if (args.length < 2) {
          return extra.reply('⚠️ يا معلم حدد الإجراء: .مكافحة_الروابط ضبط حذف | طرد 😎');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['حذف', 'طرد'].includes(setAction)) {
          return extra.reply('❌ مش صح يا باشا، اختار حذف أو طرد 😅');
        }
        
        database.updateGroupSettings(extra.from, { 
          antilinkAction: setAction,
          antilink: true // شغّل الحماية تلقائي لما تضبط الإجراء
        });
        return extra.reply(`✅ اتظبط يا معلم، الإجراء اتغير لـ: ${setAction} 😎`);
      }
      
      if (opt === 'عرض') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? 'شغال' : 'مطفي';
        const action = settings.antilinkAction || 'حذف';
        return extra.reply(`👀 حالة مكافحة الروابط:\nالحالة: ${status} 😎\nالإجراء: ${action} 🔥`);
      }
      
      return extra.reply('⚠️ استخدم .مكافحة_الروابط عشان تشوف طريقة الاستخدام 😅');
      
    } catch (error) {
      await extra.reply(`❌ حصل غلطة يا معلم: ${error.message} 😢`);
    }
  }
};
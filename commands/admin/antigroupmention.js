/**
 * أمر مكافحة منشن الكل - ستايل لوسيفر 😈
 */

const database = require('../../database');

module.exports = {
  name: 'مكافحة_منشن_جماعي',
  aliases: ['منع.منشن.جماعي'],
  category: 'admin',
  description: 'ضبط حماية منشن الكل (حذف/طرد)',
  usage: '.مكافحة_منشن_جماعي <تفعيل/تعطيل/ضبط/عرض>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? 'شغال' : 'مطفي';
        const action = settings.antigroupmentionAction || 'حذف';
        return extra.reply(
          `📌 حالة مكافحة منشن الكل:\n` +
          `الحالة: *${status}* 😎\n` +
          `الإجراء: *${action}* 🔥\n\n` +
          `طريقة الاستخدام:\n` +
          `  .مكافحة_منشن_جماعي تفعيل 😈 - شغل الحماية\n` +
          `  .مكافحة_منشن_جماعي تعطيل 💤 - قفل الحماية\n` +
          `  .مكافحة_منشن_جماعي ضبط حذف | طرد ⚡ - اختر الإجراء لما حد يخالف\n` +
          `  .مكافحة_منشن_جماعي عرض 👀 - شوف الإعدادات`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'تفعيل') {
        if (database.getGroupSettings(extra.from).antigroupmention) {
          return extra.reply('يا معلم، الحماية شغالة من زمان 😎');
        }
        database.updateGroupSettings(extra.from, { antigroupmention: true });
        return extra.reply('✅ تمام كده، حماية منشن الكل اتفعّلت 😈');
      }
      
      if (opt === 'تعطيل') {
        database.updateGroupSettings(extra.from, { antigroupmention: false });
        return extra.reply('✅ تمام يا معلم، حماية منشن الكل اتقفلت 💤');
      }
      
      if (opt === 'ضبط') {
        if (args.length < 2) {
          return extra.reply('⚠️ يا معلم حدد الإجراء: .مكافحة_منشن_جماعي ضبط حذف | طرد 😎');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['حذف', 'طرد'].includes(setAction)) {
          return extra.reply('❌ مش صح يا باشا، اختار حذف أو طرد 😅');
        }
        
        database.updateGroupSettings(extra.from, { 
          antigroupmentionAction: setAction,
          antigroupmention: true // شغّل الحماية تلقائي لما تضبط الإجراء
        });
        return extra.reply(`✅ اتظبط يا معلم، الإجراء اتغير لـ: ${setAction} 😎`);
      }
      
      if (opt === 'عرض') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? 'شغال' : 'مطفي';
        const action = settings.antigroupmentionAction || 'حذف';
        return extra.reply(`👀 حالة مكافحة منشن الكل:\nالحالة: ${status} 😎\nالإجراء: ${action} 🔥`);
      }
      
      return extra.reply('⚠️ استخدم .مكافحة_منشن_جماعي عشان تشوف طريقة الاستخدام 😅');
      
    } catch (error) {
      await extra.reply(`❌ حصل غلطة يا معلم: ${error.message} 😢`);
    }
  }
};
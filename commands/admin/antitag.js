/**
 * أمر مكافحة التاج - ستايل لوسيفر 😈
 */

const database = require('../../database');

module.exports = {
  name: 'مكافحة_المنشن',
  aliases: ['م_تاج', 'منع.المنشن'],
  description: 'ضبط حماية التاج (منع التاج أو التاج الصامت)',
  usage: '.مكافحة_المنشن <تفعيل/تعطيل/ضبط/عرض>',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? 'شغال' : 'مطفي';
        const action = settings.antitagAction || 'حذف';
        return extra.reply(
          `📛 حالة مكافحة التاج:\n` +
          `الحالة: *${status}* 😎\n` +
          `الإجراء: *${action}* 🔥\n\n` +
          'طريقة الاستخدام:\n' +
          '  .مكافحة_المنشن تفعيل 😈\n' +
          '  .مكافحة_المنشن تعطيل 😴\n' +
          '  .مكافحة_المنشن ضبط حذف | طرد ⚡\n' +
          '  .مكافحة_المنشن عرض 👀'
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'تفعيل') {
        if (database.getGroupSettings(extra.from).antitag) {
          return extra.reply('يا معلم الحماية دي شغالة من زمان 😎');
        }
        database.updateGroupSettings(extra.from, { antitag: true });
        return extra.reply('✅ تمام كده، حماية التاج اتفعّلت 😈');
      }
      
      if (opt === 'تعطيل') {
        database.updateGroupSettings(extra.from, { antitag: false });
        return extra.reply('✅ تمام، حماية التاج اتقفلت 😴');
      }
      
      if (opt === 'ضبط') {
        if (args.length < 2) {
          return extra.reply('⚠️ يا معلم حدد الإجراء: .مكافحة_المنشن ضبط حذف | طرد 😎');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['حذف', 'طرد'].includes(setAction)) {
          return extra.reply('❌ مش صح يا باشا، اختار حذف أو طرد 😅');
        }
        
        database.updateGroupSettings(extra.from, { 
          antitagAction: setAction,
          antitag: true // تفعيل تلقائي عند ضبط الإجراء
        });
        return extra.reply(`✅ اتظبط يا معلم، الإجراء اتغير لـ: ${setAction} 😎`);
      }
      
      if (opt === 'عرض') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? 'شغال' : 'مطفي';
        const action = settings.antitagAction || 'حذف';
        return extra.reply(`👀 حالة مكافحة التاج:\nالحالة: ${status} 😎\nالإجراء: ${action} 🔥`);
      }
      
      return extra.reply('⚠️ استخدم .مكافحة_المنشن عشان تشوف طريقة الاستخدام 😅');
      
    } catch (error) {
      await extra.reply(`❌ حصل غلطة: ${error.message} 😢`);
    }
  }
};
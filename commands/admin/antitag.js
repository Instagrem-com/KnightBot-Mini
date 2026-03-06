/**
 * AntiTag Command
 * Enable/disable anti-tag and set action (delete/kick)
 */

const database = require('../../database');

module.exports = {
  name: 'منع_المنشن',
  aliases: ['antimention', 'at'],
  description: 'بتمسح اي منشن جماعي 👀☣️',
  usage: '.منع_المنشن >تفعيل/تعطيل/ضبط/عرض<',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? 'تفعيل' : 'تعطيل';
        const action = settings.antitagAction || 'مسح المنشن';
        return extra.reply(
          `📛 مكافحة المنشن 📛 *${status}* (action: *${action}*).\n` +
          'الاوضاع:\n' +
          '  .منع_المنشن تفعيل\n' +
          '  .منع_المنشن تعطيل\n' +
          '  .منع_المنشن ضبط مسح / طرد\n' +
          '  .منع_المنشن عرض'
        );
      }
      
      const opt = args[0].toLowerCase();
      
      if (opt === 'تشغيل') {
        if (database.getGroupSettings(extra.from).antitag) {
          return extra.reply('*تم تفعيل منع التاج ياشق 👀❤️*');
        }
        database.updateGroupSettings(extra.from, { antitag: true });
        return extra.reply('*Antitag has been turned ON*');
      }
      
      if (opt === 'تعطيل') {
        database.updateGroupSettings(extra.from, { antitag: false });
        return extra.reply('*تم تعطيل منع التاج ياحب 💤*');
      }
      
      if (opt === 'ضبط') {
        if (args.length < 2) {
          return extra.reply('*اختار حاله منع التاج : .منع_المنشن طرد / مسح *');
        }
        
        const setAction = args[1].toLowerCase();
        if (!['delete', 'طرد'].includes(setAction)) {
          return extra.reply('*غلط يسطا اختار طرد او حذف 👀❤️*');
        }
        
        database.updateGroupSettings(extra.from, { 
          antitagAction: setAction,
          antitag: true // Auto-enable when setting action
        });
        return extra.reply(`*تم تغيير اعدادات منع التاج الي ${setAction} 👀❤️*`);
      }
      
      if (opt === 'عرض') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antitag ? 'تشغيل' : 'تعطيل';
        const action = settings.antitagAction || 'مسح';
        return extra.reply(`*معلومات منع المنشن ❤️👀:*\nالحاله: ${status}\nالاجراء: ${action}`);
      }
      
      return extra.reply('*اكتب .منع_المنشن عشان تستخدم الامر ❤️👀*');
      
    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};

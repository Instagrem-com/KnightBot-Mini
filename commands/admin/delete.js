/**
 * أمر مسح الرسائل - Delete Command
 * يحذف الرسالة اللي اترد عليها
 */

module.exports = {
  name: 'مسح',       // اسم الأمر بالعربي
  aliases: ['حذف'],  // أي اسم بديل بالعربي
  description: 'حذف رسالة تم الرد عليها', // وصف الأمر بالعربي
  usage: '.مسح (الرد على الرسالة المراد مسحها)',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      
      if (!ctx?.stanzaId || !ctx?.participant) {
        return extra.reply(' الرجاء الرد على الرسالة التي تريد مسحه 👀.');
      }
      
      const deleteKey = { 
        remoteJid: extra.from, 
        id: ctx.stanzaId, 
        participant: ctx.participant 
      };
      
      await sock.sendMessage(extra.from, { delete: deleteKey });
      
    } catch (error) {
      console.error('خطأ في أمر المسح:', error);
      await extra.reply('❌ فشل في مسح الرسالة.');
    }
  }
};
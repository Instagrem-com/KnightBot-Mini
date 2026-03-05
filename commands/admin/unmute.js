/**
 * فتح الجروب - السماح لكل الأعضاء بإرسال الرسائل
 */

module.exports = {
    name: 'فتح_الروم',
    aliases: ['فتح_الجروب', 'فتح'],
    category: 'admin',
    description: 'فتح الجروب والسماح لكل الأعضاء بالكلام',
    usage: '.فتح',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        await sock.groupSettingUpdate(extra.from, 'not_announcement');
        await extra.reply('الجروب اتفتح يكبير الكل يتكلم ياشوباب 👀❤️');
        
      } catch (error) {
        await extra.reply(`حصل خطأ: ${error.message} ❌`);
      }
    }
  };
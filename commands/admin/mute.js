/**
 * أمر قفل الجروب - ستايل لوسيفر 😈
 * يمنع الأعضاء من إرسال الرسائل
 */

module.exports = {
    name: 'قفل',
    aliases: ['mute', 'close', 'closegroup'],
    category: 'admin',
    description: 'قفل الجروب بحيث الأدمن بس يقدر يرسل رسائل 😈',
    usage: '.قفل',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        await sock.groupSettingUpdate(extra.from, 'announcement');
        await extra.reply('🔒 اتقفل الجروب دلوقتي!\nالأعضاء العاديين مش هيقدرو يبعتو رسائل 😎');
      } catch (error) {
        console.error('خطأ في أمر قفل الجروب:', error);
        await extra.reply(`❌ حصل غلطة أثناء تنفيذ الأمر: ${error.message}`);
      }
    }
};
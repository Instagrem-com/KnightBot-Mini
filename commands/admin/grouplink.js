/**
 * أمر رابط الجروب - ستايل لوسيفر 😈
 * الحصول على رابط دعوة الجروب
 */

module.exports = {
    name: 'رابط_الجروب',           
    aliases: ['رابط', 'دعوة'],     
    category: 'admin',
    description: 'جيبلك رابط دعوة الجروب 😎',
    usage: '.رابط_الجروب',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        const code = await sock.groupInviteCode(extra.from);
        const link = `https://chat.whatsapp.com/${code}`;
        
        let text = `🔗 *رابط دعوة الجروب* 😎\n\n`;
        text += `📱 اسم الجروب: ${extra.groupMetadata.subject} 😈\n`;
        text += `🔗 الرابط: ${link} 🔥\n\n`;
        text += `⚠️ خلي بالك متشاركش الرابط مع أي حد عشوائي 😅`;
        
        await extra.reply(text);
        
      } catch (error) {
        await extra.reply(`❌ يا معلم حصل خطأ: ${error.message} 😢`);
      }
    }
};
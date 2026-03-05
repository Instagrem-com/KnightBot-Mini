/**
 * أمر منشن الكل - ستايل لوسيفر 😈
 * منشن لكل أعضاء الجروب مع رسالة اختيارية
 */

module.exports = {
    name: 'منشن_الكل',
    aliases: ['tagall', 'mentionall', 'everyone'],
    category: 'admin',
    description: 'عمل منشن لكل أعضاء الجروب 🔔',
    usage: '.منشن_الكل <رسالة>',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,
    
    async execute(sock, msg, args, extra) {
      try {
        const message = args.join(' ') || 'ردو على عمكم لوسيفر 💀 🖤';
        const participants = extra.groupMetadata.participants.map(p => p.id);
        
        let text = `الي مش هيتفاعل ويرد امو رقاصه 😂 \n\n`;
        text += `${message}\n\n`;
        text += `الاعضاء 👀❤️:\n`;
        
        participants.forEach((participant, index) => {
          text += `• @${participant.split('@')[0]}\n`;
        });
        
        await sock.sendMessage(extra.from, {
          text,
          mentions: participants
        }, { quoted: msg });
        
      } catch (error) {
        await extra.reply(`❌ حصل خطأ أثناء تنفيذ الأمر\n${error.message}`);
      }
    }
};
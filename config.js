/**
 * Global Configuration for WhatsApp MD Bot
 */

module.exports = {
    // Bot Owner Configuration
    ownerNumber: ['201501728150'], // Add your number without + or spaces (e.g., 919876543210)
    ownerName: ['Knight Bot Mini', 'Professor'], // Owner names corresponding to ownerNumber array
    
    // Bot Configuration
    botName: '✪『𝙇𝙐𝘾𝙄𝙁𝙀𝙍』✪',
    prefix: '.',
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || 'KnightBot!H4sIAAAAAAAAA5VU2ZKiSBT9l3zVaBYXkIiKGEBUxIVF3Cb6IYUUs1jNTEDs8N87sLqq+mGmp+YtSW6ce+455+YPkOWYIgs1QPkBCoIryFB7ZE2BgAK08nxGBHRBCBkECkCGMc1HJo1v05VWjGA53E0nKTnAUeysNmp4sCbR/E7RwJBfwKMLivKU4OAPgLV1xwv3yqLD3FoJuB/yy5s+SoyykEcdgnew9OWrp+2hGryAR4sIMcFZZBQXlCICEws1NsTka/QtXZAKcoB3vxB1dKQ3eJQbuoxmqbxZCVWfl85Q9Y35LfsifRbXk9TSN+L1cnMNKT6QYaXv9/PptpM7Y8EbVpeTJ4X5Vpff6FMcZSg0Q5QxzJov615re2l96p9n7vJoVDM2FovQLK8Bd9QO8u6uhotjWV2du9QLvkZ8xq5u43LxfZSuotLyBodRwOlDflGK68zdIILUWvaKWuMPvxO3yXtW4v+ju2ru8fII7W2Y6h43zjaypKsbnytvmYjHRr+ON4aNxfg6zb9GXws31qLJ/auxI5s77IzH8WvkuMOwarJxKshrf26HJ49yjv9JH7KS/InlPDlp5pqwxHEG+HZJneV4xfVHC3fOTQbQH8PFDdY9KOlVbtVOz9TZnJc6VT+YzPLpwuUymp5e+fW9mF8DTbtGW3U3fo1enhPFqDFDoAiPLiAowpQRyHCePe9G/S6AYeWhgCD2lBfUxTU+z1dkd9j1bSLvigJfmsGQBIs9PzmRUjA45rkdmWv8F9AFBckDRCkKZ5iynDRLRCmMEAXK39+7IEM39mZc264ndMEZE8r8rCySHIbvrr7/hEGQlxnzmizQ2wMiQOE/rxFjOItoq2OZQRJccIX0C2QUKGeYUPQxISIoBAojJfrYWj0PW+ENdWobnrUAXZA+DcEhUIDIC6I4HPV7vCwqgvgX/Va3sLAovmWIgS5InmUDSRpJsijJI6E36rWF7f3jg2CLFyIGcUKBAvTFrixQXzfse1lQfjpVjUjVIxV8DvSejDflS8o5HozZShTihcpfjLsGkS+f9uuZJvaSaZYem7XcsU1XfvkHEKCA4JSH1F7tbtj3S7PmjNQmdCMxvufcLlq23063x2ycXRJ9wEVLqUj28819lxZblF8Sd1mdjtYa5S6S3fjkGgMz8NZLzXlpu4WowgH6vVmeu7LrCQ4nlUQa+hXj/FrDoe41bnIcS7FlSmaPJ0PenPJDMtrnO9VPPNGdLCfzRWfVbB0z6JiDwJjdycDidG4WwffMPncm+fVW4WeaWqvazzNGz9XPYGvgf1v3RrxNGP/o/obx6zH5ty0/EZs30mKxCdlRr1emu6x3WWJPhfulDtnALQZp8FrZr41xBo/H9y4oEsjOOUmBAmAWkhyHoAtIXraRNbNz/odmumaaYyeatJMnkDL1cw02OEWUwbQAiiBJotTjxb7wVmWTvJhBemlF2ErS1QePn6JdFPJUBwAA',
    newsletterJid: '120363425019719202@newsletter', // Newsletter JID for menu forwarding
    updateZipUrl: 'https://github.com/mruniquehacker/KnightBot-Mini/archive/refs/heads/main.zip', // URL to latest code zip for .update command
    
    // Sticker Configuration
    packname: 'Knight Bot Mini',
    
    // Bot Behavior
    selfMode: false, // Private mode - only owner can use commands
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot', // set bot or all via cmd
    autoDownload: false,
    
    // Group Settings Defaults
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete', // 'delete', 'kick', 'warn'
      antitag: false,
      antitagAction: 'delete',
      antiall: false, // Owner only - blocks all messages from non-admins
      antiviewonce: false,
      antibot: false,
      anticall: false, // Anti-call feature
      antigroupmention: false, // Anti-group mention feature
      antigroupmentionAction: 'delete', // 'delete', 'kick'
      welcome: false,
      welcomeMessage: '╭╼━≪•𝙽𝙴𝚆 𝙼𝙴𝙼𝙱𝙴𝚁•≫━╾╮\n┃𝚆𝙴𝙻𝙲𝙾𝙼𝙴: @user 👋\n┃Member count: #memberCount\n┃𝚃𝙸𝙼𝙴: time⏰\n╰━━━━━━━━━━━━━━━╯\n\n*@user* Welcome to *@group*! 🎉\n*Group 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽*\ngroupDesc\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ botName*',
      goodbye: false,
      goodbyeMessage: 'Goodbye @user 👋 We will never miss you!',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false // Auto-convert images/videos to stickers
    },
    
    // API Keys (add your own)
    apiKeys: {
      // Add API keys here if needed
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // Message Configuration
    messages: {
      wait: '⏳ Please wait...',
      success: '✅ Success!',
      error: '❌ Error occurred!',
      ownerOnly: '👑 This command is only for bot owner!',
      adminOnly: '🛡️ This command is only for group admins!',
      groupOnly: '👥 This command can only be used in groups!',
      privateOnly: '💬 This command can only be used in private chat!',
      botAdminNeeded: '🤖 Bot needs to be admin to execute this command!',
      invalidCommand: '❓ Invalid command! Type .menu for help'
    },
    
    // Timezone
    timezone: 'Asia/Kolkata',
    
    // Limits
    maxWarnings: 3,
    
    // Social Links (optional)
    social: {
      github: 'https://github.com/mruniquehacker',
      instagram: 'https://instagram.com/yourusername',
      youtube: 'http://youtube.com/@mr_unique_hacker'
    }
};
  

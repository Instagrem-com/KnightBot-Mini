/**
 * أمر حالة الجروب - ستايل لوسيفر 😈
 * نشر صورة/فيديو/صوت أو نص كحالة جماعية في الجروب
 */

const crypto = require('crypto');
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  downloadContentFromMessage,
} = require('@whiskeysockets/baileys');
const { PassThrough } = require('stream');
const ffmpeg = require('fluent-ffmpeg');

const PURPLE_COLOR = '#9C27B0';

module.exports = {
  name: 'تنزيل_حالة_جروب',
  aliases: ['تبديل_الحالة', 'حالة', 'ح_ج'],
  description: 'نشر صورة، فيديو، صوت أو نص كحالة جماعية في الجروب 😎',
  usage: '.حالة_الجروب [النص]  (رد على صورة/فيديو/صوت) أو .حالة_الجروب نصك',
  category: 'admin',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {
      const from = extra.from;

      if (!extra.isGroup) {
        return extra.reply('👥 يا معلم دا الأمر يشتغل بس في الجروبات 😅');
      }

      const caption = (args.join(' ') || '').trim();
      const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
      const hasQuoted = !!ctxInfo?.quotedMessage;

      // حالة نصية
      if (!hasQuoted) {
        if (!caption) {
          return extra.reply(
            '📝 *طريقة استخدام حالة الجروب*\n\n' +
            '• رد على صورة/فيديو/صوت مع:\n' +
            '  `.حالة_الجروب [نص اختياري]` 😎\n' +
            '• أو ابعت نص بس:\n' +
            '  `.حالة_الجروب نصك هنا` 🔥\n\n' +
            'النصوص هتظهر بخلفية بنفسجية كده زي ستايلنا 💜'
          );
        }

        await extra.reply('⏳ شغال أنشر النص كحالة جماعية... 😈');

        try {
          await groupStatus(sock, from, {
            text: caption,
            backgroundColor: PURPLE_COLOR,
          });
          return extra.reply('✅ اتنشر النص كحالة جماعية بنجاح! 😎');
        } catch (e) {
          console.error('groupstatus text error:', e);
          return extra.reply('❌ فشل في نشر الحالة النصية 😅: ' + (e.message || e));
        }
      }

      // حالة وسائط
      const targetMessage = {
        key: {
          remoteJid: from,
          id: ctxInfo.stanzaId,
          participant: ctxInfo.participant,
        },
        message: ctxInfo.quotedMessage,
      };

      const mtype = Object.keys(targetMessage.message)[0] || '';

      const downloadBuf = async () => {
        const qmsg = targetMessage.message;
        if (/image/i.test(mtype))   return await downloadMedia(qmsg, 'image');
        if (/video/i.test(mtype))   return await downloadMedia(qmsg, 'video');
        if (/audio/i.test(mtype))   return await downloadMedia(qmsg, 'audio');
        if (/sticker/i.test(mtype)) return await downloadMedia(qmsg, 'sticker');
        return null;
      };

      // صورة أو ملصق
      if (/image|sticker/i.test(mtype)) {
        await extra.reply('⏳ شغال أنشر الصورة كحالة جماعية... 😈');
        let buf;
        try { buf = await downloadBuf(); } catch { return extra.reply('❌ فشل تحميل الصورة 😅'); }
        if (!buf) return extra.reply('❌ مفيش صورة اتحملت 😭');

        try {
          await groupStatus(sock, from, { image: buf, caption: caption || '' });
          return extra.reply('✅ اتنشرت الصورة كحالة جماعية! 😎');
        } catch (e) {
          console.error('groupstatus image error:', e);
          return extra.reply('❌ فشل نشر الصورة 😅: ' + (e.message || e));
        }
      }

      // فيديو
      if (/video/i.test(mtype)) {
        await extra.reply('⏳ شغال أنشر الفيديو كحالة جماعية... 😈');
        let buf;
        try { buf = await downloadBuf(); } catch { return extra.reply('❌ فشل تحميل الفيديو 😅'); }
        if (!buf) return extra.reply('❌ مفيش فيديو اتحمل 😭');

        try {
          await groupStatus(sock, from, { video: buf, caption: caption || '' });
          return extra.reply('✅ اتنشر الفيديو كحالة جماعية! 😎');
        } catch (e) {
          console.error('groupstatus video error:', e);
          return extra.reply('❌ فشل نشر الفيديو 😅: ' + (e.message || e));
        }
      }

      // صوت
      if (/audio/i.test(mtype)) {
        await extra.reply('⏳ شغال أنشر الصوت كحالة جماعية... 😈');
        let buf;
        try { buf = await downloadBuf(); } catch { return extra.reply('❌ فشل تحميل الصوت 😅'); }
        if (!buf) return extra.reply('❌ مفيش صوت اتحمل 😭');

        let vn;
        try { vn = await toVN(buf); } catch { vn = buf; }

        let waveform;
        try { waveform = await generateWaveform(buf); } catch { waveform = undefined; }

        try {
          await groupStatus(sock, from, {
            audio: vn,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true,
            waveform,
          });
          return extra.reply('✅ اتنشر الصوت كحالة جماعية! 😎');
        } catch (e) {
          console.error('groupstatus audio error:', e);
          return extra.reply('❌ فشل نشر الصوت 😅: ' + (e.message || e));
        }
      }

      return extra.reply('❌ النوع ده مش مدعوم 😅، رد على صورة، فيديو، أو صوت.');
    } catch (e) {
      console.error('groupstatus command error (outer):', e);
      return extra.reply('❌ حصل خطأ 😭: ' + (e.message || e));
    }
  },
};

// ---- Helpers ----

async function downloadMedia(msg, type) {
  const mediaMsg = msg[`${type}Message`] || msg;
  const stream = await downloadContentFromMessage(mediaMsg, type);
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function groupStatus(sock, jid, content) {
  const { backgroundColor } = content;
  delete content.backgroundColor;

  const inside = await generateWAMessageContent(content, {
    upload: sock.waUploadToServer,
    backgroundColor: backgroundColor || PURPLE_COLOR,
  });

  const secret = crypto.randomBytes(32);

  const msg = generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: { messageSecret: secret },
      groupStatusMessageV2: {
        message: {
          ...inside,
          messageContextInfo: { messageSecret: secret },
        },
      },
    },
    {}
  );

  await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
  return msg;
}

function toVN(buffer) {
  return new Promise((resolve, reject) => {
    const input = new PassThrough();
    const output = new PassThrough();
    const chunks = [];

    input.end(buffer);

    ffmpeg(input)
      .noVideo()
      .audioCodec('libopus')
      .format('ogg')
      .audioChannels(1)
      .audioFrequency(48000)
      .on('error', reject)
      .on('end', () => resolve(Buffer.concat(chunks)))
      .pipe(output);

    output.on('data', (c) => chunks.push(c));
  });
}

function generateWaveform(buffer, bars = 64) {
  return new Promise((resolve, reject) => {
    const input = new PassThrough();
    input.end(buffer);

    const chunks = [];

    ffmpeg(input)
      .audioChannels(1)
      .audioFrequency(16000)
      .format('s16le')
      .on('error', reject)
      .on('end', () => {
        const raw = Buffer.concat(chunks);
        const samples = raw.length / 2;
        const amps = [];

        for (let i = 0; i < samples; i++) amps.push(Math.abs(raw.readInt16LE(i * 2)) / 32768);

        const size = Math.floor(amps.length / bars);
        if (size === 0) return resolve(undefined);

        const avg = Array.from({ length: bars }, (_, i) =>
          amps.slice(i * size, (i + 1) * size).reduce((a, b) => a + b, 0) / size
        );

        const max = Math.max(...avg);
        if (max === 0) return resolve(undefined);

        resolve(Buffer.from(avg.map((v) => Math.floor((v / max) * 100))).toString('base64'));
      })
      .pipe()
      .on('data', (c) => chunks.push(c));
  });
}
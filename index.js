const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`${client.user.tag} 로그인 완료`);
});

client.on('ready', async () => {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);

  const embed = new EmbedBuilder()
    .setTitle('ANALOGUE STUDIO 에서 인증하기')
    .setDescription('아래 버튼을 눌러 인증해주세요')
    .setImage('https://freeimage.host/i/qqc4xwJ')
    .setColor(0x2b2d31);

  const button = new ButtonBuilder()
    .setLabel('✅ 인증하기')
    .setStyle(ButtonStyle.Link)
    .setURL('https://verif33ddkw2.netlify.app/');

  const row = new ActionRowBuilder().addComponents(button);

  await channel.send({
    embeds: [embed],
    components: [row]
  });
});

client.login(process.env.TOKEN);

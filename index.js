const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers // 👈 멤버 이벤트 필요
  ]
});

const JOIN_ROLE = '1477654676760428591';
const VERIFIED_ROLE = '1477654583785426997';

client.once(Events.ClientReady, () => {
  console.log(`${client.user.tag} 로그인 완료`);
});


// 🔹 서버 처음 입장 시 역할 지급
client.on(Events.GuildMemberAdd, async (member) => {
  try {
    await member.roles.add(JOIN_ROLE);
    console.log(`${member.user.tag} 에게 입장 역할 지급 완료`);
  } catch (err) {
    console.error('입장 역할 지급 실패:', err);
  }
});


// 🔹 인증 버튼 생성 (봇 실행 시 1번 전송)
client.once(Events.ClientReady, async () => {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);

  const embed = new EmbedBuilder()
    .setTitle('ANALOGUE STUDIO 에서 인증하기')
    .setDescription('아래 버튼을 눌러 인증해주세요')
    .setImage('https://cdn.discordapp.com/attachments/1477654303664508981/1478026890991370413/2026-03-01_223707.png?ex=69a6e74f&is=69a595cf&hm=42fd01e8025633f613815d4b9ea32c6733ac0bb17bffd41d26cb93425eaac07c')
    .setColor(0x2b2d31);

  const button = new ButtonBuilder()
    .setCustomId('verify_button')
    .setLabel('✅ 인증하기')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(button);

  await channel.send({
    embeds: [embed],
    components: [row]
  });
});


// 🔹 버튼 눌렀을 때 역할 변경
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'verify_button') return;

  try {
    await interaction.member.roles.remove(JOIN_ROLE);
    await interaction.member.roles.add(VERIFIED_ROLE);

    await interaction.reply({
      content: '✅ 인증이 완료되었습니다!',
      ephemeral: true
    });

  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: '❌ 인증 처리 중 오류가 발생했습니다.',
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);

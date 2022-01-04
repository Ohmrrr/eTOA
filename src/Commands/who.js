const Command = require('../Structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'who',
  aliases: [],
  description: 'Replies to a question with a random user.',
  usage: 'e!who [question]',
  userPermission: ['SEND_MESSAGES'],
  botPermission: ['SEND_MESSAGES', 'EMBED_LINKS'],

  async execute(message, args, client) {
    const question = args.slice(1).join(' ');
    const whoResponse = new MessageEmbed();

    if (!question) {
      whoResponse.setColor('RED').setDescription('What was your question? 🔮');

      return message.channel.send({ embeds: [whoResponse] });
    }

    const randMember = message.guild.members.cache.random();

    whoResponse
      .setColor('#010203')
      .setTitle(randMember.user.tag)
      .setImage(
        randMember.displayAvatarURL({
          dynamic: true,
          format: 'png',
          size: 4096,
        })
      );

    message.channel.send({
      content: `🔮 **${message.author.username}** 🔮`,
      embeds: [whoResponse],
    });
  },
});

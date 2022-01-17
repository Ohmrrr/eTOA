const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'ban',
  aliases: ['banish', 'exile'],
  description: 'Bans a member from a guild.',
  usage: 'e!ban [user] [reason?]',
  userPermission: ['SEND_MESSAGES', 'BAN_MEMBERS'],
  botPermission: ['SEND_MESSAGES', 'BAN_MEMBERS'],

  async execute(message, args, client) {
    const userBanned = new MessageEmbed();
    const user = args[1].toLowerCase();
    const reason = args[2] ? args.slice(2).join(' ') : null;

    if (!user) {
      userBanned
        .setColor('RED')
        .setDescription('🔴 Enter a user to be banned.');

      return message.channel.send({ embeds: [userBanned] });
    }

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (m) => m.user.username.toLowerCase() === user
      ) ||
      message.guild.members.cache.find(
        (m) => m.user.tag.toLowerCase() === user
      ) ||
      message.guild.members.cache.find((m) => m.user.id === user);

    if (!member) {
      userBanned
        .setColor('RED')
        .setDescription(`🔴 Could not find user ${user}.`);

      return message.channel.send({ embeds: [userBanned] });
    }

    if (!member.bannable) {
      userBanned
        .setColor('RED')
        .setDescription(`🔴 That user can't be banned.`);

      return message.channel.send({ embeds: [userBanned] });
    } else {
      if (reason) member.ban(reason);
      else member.ban();

      userBanned
        .setColor('GREEN')
        .setDescription(`***${member.user.tag} was banned.`);

      message.channel.send({ embeds: [userBanned] });
    }
  },
});

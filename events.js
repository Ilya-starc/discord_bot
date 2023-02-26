module.exports.registerPlayerEvents = (player) => {
    player.on('error', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });

    player.on('connectionError', (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on('trackStart', (queue, track) => {
        const showTrack = {
            color: 0x2b2d30,
            title: `${track.title}`,
            url: track.url,
            description: `${track.duration != '0:00' ? `Track duration: **${track.duration}**` : '🔴 LIVE STREAM'}`,
            image: {
                url: track.thumbnail
            },
        };
        queue.metadata.send({ embeds: [showTrack] })
            .then(embedMessage => {
                embedMessage.react('👍').then(() => embedMessage.react('👎'));
            });
    });

    // player.on('trackAdd', (queue, track) => {
    //     queue.metadata.send(`Queued **${track.title}**`);
    // });

    player.on('botDisconnect', (queue) => {
        queue.metadata.send('I was manually disconnected from the voice channel, clearing queue!');
    });

    player.on('channelEmpty', (queue) => {
        queue.metadata.send('Nobody is in the voice channel, leaving...');
    });

    // player.on('queueEnd', (queue) => {
    //     queue.metadata.send('Stopped playing');
    // });
};

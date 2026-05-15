const config = require('../config.json');

module.exports = {
    nome: 'messageCreate',
    async executar(message, client) {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefixo)) return;

        const args = message.content.slice(config.prefixo.length).trim().split(/ +/);
        const comandoNome = args.shift().toLowerCase();

        const comando = client.comandos.get(comandoNome);

        if (!comando) return;

        try {
            comando.executar(message, args);
        } catch (erro) {
            console.error(erro);
            message.reply('Erro ao executar o comando.');
        }
    }
};

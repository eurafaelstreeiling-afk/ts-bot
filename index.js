const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.comandos = new Collection();

// Carregar comandos
const comandosPath = path.join(__dirname, 'comandos');
const arquivosComandos = fs.readdirSync(comandosPath).filter(file => file.endsWith('.js'));

for (const file of arquivosComandos) {
    const comando = require(`./comandos/${file}`);
    client.comandos.set(comando.nome, comando);
}

// Carregar eventos
const eventosPath = path.join(__dirname, 'eventos');
const arquivosEventos = fs.readdirSync(eventosPath).filter(file => file.endsWith('.js'));

for (const file of arquivosEventos) {
    const evento = require(`./eventos/${file}`);

    if (evento.once) {
        client.once(evento.nome, (...args) => evento.executar(...args, client));
    } else {
        client.on(evento.nome, (...args) => evento.executar(...args, client));
    }
}

client.login(config.token);

module.exports = {
    nome: 'ready',
    once: true,
    executar(client) {
        console.log(`${client.user.tag} foi iniciado!`);
    }
};

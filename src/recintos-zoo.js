/* CONSTANTES ESPECÍFICADAS NO README */
const ANIMAIS = {
    LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
    LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
    CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
    MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
    GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
    HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false, toleraOutrasEspecies: true }
};

const RECINTOS = [
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
    { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
    { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] }
];

class RecintosZoo {

    // Construtor que inicializa os animais e recintos
    constructor() {
        this.animais = ANIMAIS;
        this.recintos = RECINTOS;
    }

    // Verifica os recintos que podem receber o animal
    analisaRecintos(especie, quantidade) {

        // Validar se o animal é válido
        if (!this.animais[especie]) {
            return { erro: "Animal inválido" };
        }

        // Validar se a quantidade é válida
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        // Filtrar os recintos que podem receber o animal
        const recintosViaveis = this.recintosViaveis(especie, quantidade);

        // Verificar se há recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }

    // Método que retorna os recintos viáveis para o animal
    recintosViaveis(especie, quantidade) {
        const { tamanho, biomas } = this.animais[especie];
        const recintosDisponiveis = [];

        // Verifica cada recinto disponível para o animal
        this.recintos.forEach((recinto) => {

            // Verifica se pelo menos um bioma do recinto é adequado
            const biomasRecinto = recinto.bioma.split(' e ');
            /*
            * .split(): Usado para dividir uma string em um array de substrings
            * com base em um separador fornecido como argumento.
            */

            // Verifica se pelo menos um bioma do recinto é adequado
            const biomaAdequado = biomas.some(bioma => biomasRecinto.includes(bioma));

            /*
             * .some(): Método usado em arrays que testa se ao menos um dos elementos no array passa no teste implementado pela função fornecida. 
             * Retorna true se encontrar um elemento que satisfaça a condição, caso contrário, retorna false.
            */

            if (!biomaAdequado) return;


            // Verifica as regras específicas de convivência
            if (this.validarConvivencia(especie, quantidade, recinto)) {

                // Calcula o espaço ocupado no recinto com base nos animais existentes
                let espacoOcupado = recinto.animaisExistentes.reduce((total, animal) => {
                    const { especie, quantidade } = animal;
                    return total + (this.animais[especie].tamanho * quantidade);
                }, 0);

                // Verifica se há mais de uma espécie no recinto, ignorando espécies repetidas pelo new Set
                let especiesExistentes = new Set(recinto.animaisExistentes.map(animal => animal.especie));
                if (especiesExistentes.size >= 1 && !especiesExistentes.has(especie)) {
                    espacoOcupado += 1;
                }
                let espacoRestante = recinto.tamanhoTotal - espacoOcupado;

                // Verifica se há espaço suficiente para o novo animal
                if (espacoRestante < quantidade * tamanho) return;

                let espacoLivre = espacoRestante - quantidade * tamanho;
                recintosDisponiveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        });

        // Ordena os recintos disponíveis por número usando o método sort
        return recintosDisponiveis.sort((a, b) => {
            const numeroA = parseInt(a.match(/\d+/)[0], 10);
            const numeroB = parseInt(b.match(/\d+/)[0], 10);
            return numeroA - numeroB;
        });

    }

    // Verifica se o animal pode conviver com os existentes
    validarConvivencia(especie, quantidade, recinto) {
        const { carnivoro } = this.animais[especie];
        const animaisNoRecinto = recinto.animaisExistentes;

        // Regra dos macacos: não podem ficar sozinhos
        if (especie === 'MACACO' && animaisNoRecinto.length === 0 && quantidade < 2) {
            return false; // Não pode alocar um único macaco num recinto vazio
        }

        // Regras de convivência para carnívoros e outras espécies
        for (const animal of animaisNoRecinto) {
            const { especie: especieExistente } = animal;
            const carnivoroExistente = this.animais[especieExistente].carnivoro;

            // Carnívoros não podem conviver com outras espécies
            if (carnivoro || carnivoroExistente) {
                if (especie !== especieExistente) return false;
            }
        }

        return true;
    }

}


export { RecintosZoo as RecintosZoo };

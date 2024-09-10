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

    // Método que retorna o recinto com o maior número de animais
    analisaRecintos(animal, quantidade) {
        // Validar se o animal é válido
        if (!this.animais[animal]) {
            return { erro: "Animal inválido"};
        }
    }

}

export { RecintosZoo as RecintosZoo };

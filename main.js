const campoSenha = document.querySelector("#campo-senha");
const botoes = document.querySelectorAll(".parametro-senha__botao");
const tamanhoTexto = document.querySelector(".parametro-senha__texto");
const checkboxes = document.querySelectorAll(".checkbox");
const barraForca = document.querySelector(".forca");
const entropiaTexto = document.querySelector(".entropia");

let tamanhoSenha = 12;

const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*()_-+=<>?/[]{}";

function gerarSenha() {

    let caracteres = "";

    if (checkboxes[0].checked) caracteres += maiusculas;
    if (checkboxes[1].checked) caracteres += minusculas;
    if (checkboxes[2].checked) caracteres += numeros;
    if (checkboxes[3].checked) caracteres += simbolos;

    if (caracteres.length === 0) {
        campoSenha.value = "Selecione uma opção";
        return;
    }

    let senha = "";

    for(let i = 0; i < tamanhoSenha; i++) {
        const random = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[random];
    }

    campoSenha.value = senha;

    calcularForca(caracteres.length);
}

function calcularForca(baseCaracteres){

    const entropia = Math.round(
        tamanhoSenha * Math.log2(baseCaracteres)
    );

    entropiaTexto.textContent =
        `Entropia: ${entropia} bits`;

    barraForca.classList.remove("fraca","media","forte");

    if(entropia < 50){
        barraForca.classList.add("fraca");
        barraForca.style.width = "33%";
    }
    else if(entropia < 80){
        barraForca.classList.add("media");
        barraForca.style.width = "66%";
    }
    else{
        barraForca.classList.add("forte");
        barraForca.style.width = "100%";
    }
}

botoes[0].addEventListener("click", () => {
    if(tamanhoSenha > 4){
        tamanhoSenha--;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

botoes[1].addEventListener("click", () => {
    if(tamanhoSenha < 50){
        tamanhoSenha++;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

checkboxes.forEach(item => {
    item.addEventListener("change", gerarSenha);
});

campoSenha.addEventListener("click", () => {

    navigator.clipboard.writeText(campoSenha.value);

    const valorOriginal = campoSenha.value;

    campoSenha.value = "Senha copiada! ✅";

    setTimeout(() => {
        campoSenha.value = valorOriginal;
    }, 1500);
});

gerarSenha();

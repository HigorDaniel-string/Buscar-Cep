console.log('Codigo melhorado')

// Classe responsavel de buscar dados do cep de um usuario e retornar os dados.
class BuscarEnderecoUsuario {
    cep
    
    constructor(cep){
        this.cep = cep;
    }

    limparCaracterEspecialCep(){
        return this.cep.replace('-', '')
    }

    cepValidoParaBusca(){
        return this.limparCaracterEspecialCep().length === 8;
    }

    async buscarDadosEndereco(){
        const request = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
        return await request.json();
    }
}

const inputCep = document.getElementById("buscarcep")

inputCep.addEventListener('input', async (e) =>{
    const usuarioCep = new BuscarEnderecoUsuario(e.target.value)

    if(usuarioCep.cepValidoParaBusca()){
       var enderecoUsuario = await usuarioCep.buscarDadosEndereco();
       preencherDadosEnderecoTela(enderecoUsuario);
    }
    else{
        limparDadosDosCamposDeCep2();
    }
})

function limparDadosDosCamposDeCep2(){
  const campos = ['cep', 'logradouro', 'complemento','bairro', 'localidade', 'uf', 'ibge','siafi','ddd' ]
  campos.forEach(limparTagSpan)
}

function limparTagSpan(idSpan){
    document.getElementById(idSpan).textContent = "";
}

function preencherDadosEnderecoTela(dados){
    for (const prop in dados) {
        const element = document.getElementById(prop);
        if (element) {
          element.textContent = dados[prop];
        }
    }
}





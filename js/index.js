console.log('Inicializou')

class CepUsuario {
    cep
    
    constructor(cep){
        this.cep = cep;
    }

    limparCaracterEspecialCep(){
        return this.cep.replace('-', '')
    }
}

const inputCep = document.getElementById("buscarcep")

inputCep.addEventListener('input', (e) =>{
    const usuarioCep = new CepUsuario(e.target.value)

    if(usuarioCep.limparCaracterEspecialCep().length === 8){
        buscarDadosCEP(usuarioCep.limparCaracterEspecialCep());
    }
    else{
        limparDadosDosCamposDeCep2();
    }
})

function limparDadosDosCamposDeCep2(){
  const campos = ['cep', 'logradouro', 'complemento','bairro', 'localidade', 'uf', 'ibge','siafi','ddd' ]
  campos.forEach(limparTagSpan)
}

function limparDadosDosCamposDeCep1(){
    limparTagSpan('cep');
    limparTagSpan('logradouro');
    limparTagSpan('complemento');
    limparTagSpan('bairro');
    limparTagSpan('localidade');
    limparTagSpan('uf');
    limparTagSpan('ibge');
    limparTagSpan('gia');
    limparTagSpan('ddd');
    limparTagSpan('siafi');
}

function limparTagSpan(idSpan){
    document.getElementById(idSpan).textContent = "";
}

async function buscarDadosCEP(cep){
    const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const dados = await request.json();

    for (const prop in dados) {
        const element = document.getElementById(prop);
        if (element) {
          element.textContent = dados[prop];
        }
    }
}





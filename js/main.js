const screenOne = document.querySelector('.screen-one')
const screenTwo = document.querySelector('.screen-two')
const titleTwo =  document.querySelector('.title-two')
const nome = document.querySelector('#name')
const mensalidade = document.querySelector('#mensalidade')
const taxaDeJuros = document.querySelector('#taxa-de-juros')
const tempoContribuicao = document.querySelector('#year')
const buttonCalcular = document.querySelector('#buttonCalcular')
const buttonRecalcular = document.querySelector('#buttonRecalcular')

buttonCalcular.addEventListener('click',(e)=>{
  e.preventDefault()

  const valueNome = nome.value
  const valueMensalidade = mensalidade.value
  const valueTaxaDeJuros = taxaDeJuros.value
  const valueTaxaDeJurosReplace = Number(valueTaxaDeJuros.replace(',','.').replace('%',''))
  const valueTempoDeContribuição = tempoContribuicao.value
  const valueTempoEmMeses = valueTempoDeContribuição * 12
  
  let check = 0

  if(valueNome === ''){
    nome.classList.add('error')
     check = 0
  }else{
    nome.classList.remove('error')
     check = 1
  }

  if(valueMensalidade === ''){
    mensalidade.classList.add('error')
     check = 0
  }else{
    mensalidade.classList.remove('error')
     check = 1
  }

  if(valueTaxaDeJuros === ''){
    taxaDeJuros.classList.add('error')
     check = 0
  }else{
    taxaDeJuros.classList.remove('error')
     check = 1
  }

  if(check === 1){

    fetch('http://api.mathjs.org/v4/', {
      method:'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify({ "expr": `${valueMensalidade} * (((1 + ${valueTaxaDeJurosReplace/100}) ^ ${valueTempoEmMeses} - 1) / ${valueTaxaDeJurosReplace})` })
    })
    .then(response => response.json())
    .then(result =>{
      const resultado = Number(result.result)
      titleTwo.innerHTML = `
        Olá ${valueNome}, juntando R$${valueMensalidade} todo mês, você terá R$${resultado.toFixed(2).replace('.','')} em ${valueTempoDeContribuição} anos sob uma taxa de ${valueTaxaDeJuros} ao mês.
      `

      screenOne.classList.add('hidden')
      screenTwo.classList.remove('hidden')
    })
    .catch() 
  }
})

buttonRecalcular.addEventListener('click',(e)=>{
  location.reload()
})
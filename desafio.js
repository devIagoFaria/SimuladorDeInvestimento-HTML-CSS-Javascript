
//-----------------------------------------------//--------------------------------------------------------//
//PEGANDO OS DADOS DO CLIENTE
function person() {

    let person = personControl.takePerson()

    if (person == false) return false

    // console.log(`Passo 01 - Captando a pessoa `, person)

    console.log('SIMULADOR DE INVESTIMENTO')
    console.log('Nome: ' + person.name)
    console.log('Sexo: ' + person.gender)
    console.log('Idade: ' + person.age)
    console.log('Renda Mensal: R$' + person.income)


    return HtmlControl.loading(person)

}

const personControl = {

    //ESSA FUNÇÃO É PARA CAPTAR E VALIDAR OS INPUTS REFERENTE A PESSOA
    takePerson: () => {

        //ESSE METODOS ALEM DE PEGAR O VALORES DOS INPUT, ELES FAZEM UMA VALIDAÇÃO DE ESTAR VAZIO OU NÃO
        let name = HtmlControl.bringMeDataAndValidate('name')
        let gender = HtmlControl.giveMeTheChecked('gender')
        let age = HtmlControl.bringMeDataAndValidate('age')
        let income = HtmlControl.bringMeDataAndValidate('income')



        let person = {

            name: name,
            gender: gender,
            age: age,
            income: income,
            previousPage: 'persona',
            nextPage: 'quiz'
        }



        //VAI TRAVAR A FUNÇÃO SE OS VALORES ALGUM VALOR ESTIVER VAZIO
        let inputs = [name, gender, age, income]
        if (HtmlControl.validation(inputs) == false) {

            return false

        } else {
            return person

        }



    },

}







//-----------------------------------------------//--------------------------------------------------------//
//SABER O PERFIL MAIS INDICADO
function profileAnalysis() {



    //CAPTURAR TODAS AS RESPOSTAS
    let answer = []




    //PEGANDO TODAS AS RESPOTAS E CONCATENAR EM UM ARRAY AS RESPOSTAS
    let question01 = HtmlControl.giveMeTheChecked('question01')

    let question02 = HtmlControl.giveMeTheChecked('question02')

    let test = answer.concat(question01, question02)




    //-----------------------------------------VALIDAÇÃO----------------------------------------------\\
    //SABER SE FOI MARCADAS OU NÃO
    let validation = profileEvaluation.validation(test)
    if (validation == false) {
        alert('Verifique se todas as foram marcadas')
        return false
    }
    //------------------------------------------------------------------------------------------------\\




    let conservador = []
    let ultraconservador = []
    let dinamico = []
    let arrojado = []

    test.forEach(item => {

        switch (item) {
            case '1A':
                conservador.push(0.1);
                dinamico.push(0.9)
                break;

            case '1B':
                arrojado.push(0.65);
                dinamico.push(0.35)
                break;

            case '1C':
                arrojado.push(0.23);
                dinamico.push(0.77)
                break;

            case '1D':
                conservador.push(0.25);
                dinamico.push(0.64)
                break;

            case '1E':
                conservador.push(0.25);
                ultraconservador.push(0.75)
                break;

            case '2A':
                conservador.push(0.4);
                ultraconservador.push(0.6)
                break;

            case '2B':
                dinamico.push(0.4);
                arrojado.push(0.6)
                break;

            case '2C':
                dinamico.push(0.3);
                arrojado.push(0.7)
                break;

            case '2D':
                dinamico.push(0.3);
                conservador.push(0.7)
                break;

            case '2E':
                conservador.push(0.4);
                ultraconservador.push(0.6)
                break;

            default:
                break;
        }


    })





    //ORGANIZANDO OS DADOS PARA VIR UM ARRAY DE OBJETOS COM O NOME E VALOR
    let profiles = profileEvaluation.organizingThePoints(conservador, ultraconservador, dinamico, arrojado)




    // PEGANDO O PERFIL MAIS INDICADO
    let profileIs = profileEvaluation.is(profiles)




    //TUTORIAL PASSO A PASSO
    // console.log('Passo 01 - Declarando uma array vazio', answer)
    // console.log('Passo 02 - Pegue e junte todas as respostas e faça um valor para cada string', test)
    // console.log('Passo 03 - declare 4 array vazios e dê uma pontuação com o swift de cada resposta')
    // console.log('Passo 04 - Essa são as pontuaçoes', 'conservador: ' , conservador, 'ultraconservador: ' , ultraconservador, 'dinamico: ' , dinamico,'arrojado: ' , arrojado)
    // console.log('Passo 06 - Veja os pontos organizados e depois vá descobrir qual é o mais indicado ', profiles)
    // console.log('Passo 07 - Do array de objetos, esse é o perfil mais indicado ', profileIs)

    console.log('Perfil do Investidor: ' + profileIs.profile)

    if (profileIs.nextPage == 'fixo') {
        
        console.log('Sugestão de Investimento: Poupança Renda Fixa ')
    }
    if (profileIs.nextPage == 'variavel'){
        console.log('Sugestão de Investimento: Renda Variavel, Ações')
    }


    return animation(profileIs)



}

const profileEvaluation = {

    validation: (array) => {

        let v;

        array.forEach(item => {
            if (item == false) {
                v = false
            }

        })

        if (v == false) return false
        else return true




    },
    pointsAdded: (array, params, renda) => {

        if (array == '') {
            return null
        }

        let soma = array.reduce((total, item) => {
            total += item
            return total
        })

        return { profile: params, valor: (soma).toFixed(2), nextPage: renda, previousPage: 'quiz' }

    },
    organizingThePoints: (conservador, ultraconservador, dinamico, arrojado) => {

        let allPointOfTheConservatives = profileEvaluation.pointsAdded(conservador, "conservador", 'fixo')

        let allPointOfTheUltra = profileEvaluation.pointsAdded(ultraconservador, 'ultraconservador', 'fixo')

        let allPointOftheDinamic = profileEvaluation.pointsAdded(dinamico, 'dinamico', 'variavel')

        let allPointOftheBold = profileEvaluation.pointsAdded(arrojado, 'arrojado', 'variavel')


        let X = [allPointOfTheConservatives, allPointOfTheUltra, allPointOftheDinamic, allPointOftheBold]

        let profiles = X.filter(item => { return item != null })

        return profiles

    }
    ,
    totalValues: (array) => {

        let values;

        values = array.map(item => { return item.valor })
            .reduce((total, item) => {
                total += item

                return total
            })

        return values

    },
    is: (array) => {

        let onlyValues = array.map(item => { return item.valor })

        let hightestValue = Math.max.apply(null, onlyValues)

        let X;

        array.forEach(item => {

            if (item.valor == hightestValue) {

                X = item
            }
        })

        //EXEMPLO: X = {perfil: 'conservador', valor: 0.8}
        return X

    },
    percentages: (array) => {
        ;

        let conservador;
        let ultraconservador;
        let dinamico;
        let arrojado;

        let total = profileEvaluation.totalValues(array)


        for (let i = 0; i < array.length; i++) {

            if (array[i].profile == 'conservador') {
                conservador = { nome: 'Conservador', percentual: `${array[i].valor / total * 100}%` }
            }
            else if (array[i].profile == 'ultraconservador') {
                ultraconservador = { nome: 'Ultraconservador', percentual: `${array[i].valor / total * 100}%` }
            }
            else if (array[i].profile == 'dinamico') {
                dinamico = { nome: 'Dinamico', percentual: `${array[i].valor / total * 100}%` }
            }
            else if (array[i].profile == 'arrojado') {
                arrojado = { nome: 'Arrojado', percentual: `${array[i].valor / total * 100}%` }
            }


        }


        let percentages = [conservador, ultraconservador, dinamico, arrojado]
            .filter(item => { return item != undefined })



        return percentages


    }



}







//-----------------------------------------------//--------------------------------------------------------//
//INVESTIMENTO IDEAL
function investment(params) {

    let result;

    switch (params) {
        case 'conservador':
            result = investmentControl.fixedIncome()
            break;

        case 'ultraconservador':
            result = investmentControl.fixedIncome()
            break;

        case 'dinamico':
            result = investmentControl.variableIncome()
            break;

        case 'arrojado':
            result = investmentControl.variableIncome()
            break;

        default:
            break;
    }

    return result

}

const investmentControl = {
    fixedIncome: () => {


        let initialInvestiment = HtmlControl.bringMeDataAndValidate('capital')

        let interest = HtmlControl.bringMeDataAndValidate('juros')

        let time = HtmlControl.bringMeDataAndValidate('tempo')

        let inflation = HtmlControl.bringMeDataAndValidate('inflação')

        let inputs = [initialInvestiment, interest, time, inflation]


        if (HtmlControl.validation(inputs) == false) return false


        //---------------------------- RESULTADOS --------------------------\\

        let monthlyInterestInDecimal = investmentControl.toDecimal(interest) / 12
        let inflationInDecimal = investmentControl.toDecimal(inflation)

        console.log(' ')

        let SI = investmentControl.simpleInterest(initialInvestiment, monthlyInterestInDecimal, time)

        let CI = investmentControl.compoundInterest(initialInvestiment, monthlyInterestInDecimal, time)

        let I = investmentControl.inflation(initialInvestiment, CI, inflationInDecimal)

        let resultado = {
            initialInvestiment: initialInvestiment,
            interest: interest,
            time: time,
            inflation: inflation,
            simpleInterest: SI,
            compoundInterest: CI,
            valueWithInflation: I,
            previousPage: 'fixo',
            nextPage: 'resultado'

        }




        return HtmlControl.createHTMLFromResult(resultado)

    },
    variableIncome: () => {

        let stockOnPurchase = HtmlControl.bringMeDataAndValidate('compra')

        let stockOnSale = HtmlControl.bringMeDataAndValidate('venda')

        let allStock = HtmlControl.bringMeDataAndValidate('ações')



        let inputs = [stockOnPurchase, stockOnSale, allStock]


        if (HtmlControl.validation(inputs) == false) return false





        //---------------------------- RESULTADOS --------------------------\\

        let stockYield = (stockOnSale / stockOnPurchase) * 100 - 100

        let profit = allStock * (stockYield / 100).toFixed(2)


        console.log(' ')
        console.log('Simulação de Investimento')
        console.log('Lucro Possivel: R$', (profit - allStock).toFixed(2))

        let result = {

            onPurchase: stockOnPurchase,
            onSale: stockOnSale,
            stock: allStock,
            stockYield: (stockYield).toFixed(2),
            profit: (profit).toFixed(2),
            previousPage: 'variavel',
            nextPage: 'resultado'


        }

        return HtmlControl.createHTMLFromResult(result)



    },
    simpleInterest: (initialInvestiment, interest, time) => {

        let amount = (initialInvestiment * interest * time)
        let finalValue = parseFloat(amount) + parseFloat(initialInvestiment)

        console.log('Simulação de Investimento')
        console.log('Com juros simples')
        console.log('Lucro Possivel: R$', amount.toFixed(2))

        return finalValue
    },
    compoundInterest: (initialInvestiment, interest, time) => {

        let A = (initialInvestiment * (1 + interest) ** time).toFixed(2)

        console.log('Com juros compostos')
        console.log('Lucro Possivel: R$', (A - initialInvestiment).toFixed(2))

        return A

    },
    inflation: (initialInvestiment, amount, inflation) => {

        let grossIncome = (amount / initialInvestiment) - 1

        let netIncome = ((1 + grossIncome) / (1 + inflation)) - 1
        //4.1%

        let realProfit = (initialInvestiment * netIncome)

        let realValue = parseFloat(realProfit) + parseFloat(initialInvestiment)


        return realValue.toFixed(2)
    },
    toDecimal: (params) => {
        return parseFloat(params / 100)
    }


}








//-----------------------------------------------//--------------------------------------------------------//
//ANIMAÇÕES E HTML

function animation(params) {


    HtmlControl.createHTML(params)

    return HtmlControl.loading(params)

}

function reset(){
    window.location = '/desafio02.html'
}

const HtmlControl = {
    loading: (object) => {

        let profile = document.getElementById(object.nextPage)

        let previous = document.getElementById(object.previousPage)
        let load = document.getElementById('loading')

        previous.style.display = 'none'
        load.style.display = 'flex'

        setTimeout(() => {
            load.style.display = 'none'
            profile.style.display = 'flex'

        }, 2000)

    },
    createHTML: (object) => {

        let profileid = document.getElementById(`${object.nextPage}Title`)

        profileid.innerText = `Seu perfil é ${object.profile}!`

        let renda = document.getElementById(object.nextPage)
        renda.innerHTML += `<button onclick="investment('${object.profile}')">CALCULAR</button>`



    },
    createHTMLFromResult: (object) => {

        HtmlControl.loading(object)

        let person = personControl.takePerson()

        let cardPerson = document.getElementById('card-person')
        let thInfo = document.getElementById('tableThInfo')
        let tdInfo = document.getElementById('tableTdInfo')

        let th = document.getElementById('tableTh')
        let td = document.getElementById('tableTd')

        cardPerson.innerHTML = `            
        <div> Nome: ${person.name} </div>
        <div> Sexo:  ${person.gender} </div>
        <div> Idade: ${person.age} anos </div>
        <div> Renda: R$ ${person.income} </div>
        `


        if (object.previousPage == 'fixo') {

            thInfo.innerHTML = `

            <th> Capital Investido </th>
            <th> Juros a.a </th>
            <th> Periodo </th>
            <th> Inflação acumulada <br> do periodo</th>

            `


            tdInfo.innerHTML = `
            <td>R$ ${object.initialInvestiment} </td>
            <td> ${object.interest}% </td>
            <td> ${object.time} meses </td>
            <td> ${object.inflation}%</td>
                `

            th.innerHTML = `
            <th> Retorno com juros simples </th>
            <th> Retorno com juros Composto </th>
            <th> Rentabilidade real com a inflação</th>
            `

            td.innerHTML = `                 
            <td>R$ ${object.simpleInterest}</td>
            <td>R$ ${object.compoundInterest}</td>
            <td>R$ ${object.valueWithInflation}</td>
            `



        }

        else {

            thInfo.innerHTML = `

            <th> Ações </th>
            <th> Valor da ação na compra</th>
            <th> Valor da ação na venda </th>

            `

            tdInfo.innerHTML = `

            <td>R$ ${object.stock} </td>
            <td>R$ ${object.onPurchase} </td>
            <td>R$ ${object.onSale} </td>

            `

            th.innerHTML = `
            <th> Valor final das ações </th>
            <th> Rendimento </th>
            `

            td.innerHTML = `                 
            <td>R$ ${object.profit}</td>
            <td>${object.stockYield}%</td>

            `


        }





    },
    giveMeTheChecked: (question) => {

        let answer;

        document.getElementsByName(question).forEach(item => {
            if (item.checked == true) answer = item.value
        })


        if (answer == undefined) {
            return HtmlControl.validationRadio(question)
        }

        return answer

    },
    bringMeDataAndValidate: (params) => {

        let input = document.getElementById(params)

        let small = document.getElementById(`${params}Error`)

        if (input.value == '') {
            small.innerHTML = "*campo obrigatorio"
            return false

        } else {
            small.innerHTML = ""
            return input.value

        }

    },
    validationRadio: (params) => {

        let div = document.getElementById(`${params}Error`)
        div.innerHTML = '*campo obrigatório'
        return false

    },
    validation: (params) => {

        let validation;

        params.forEach(item => {
            if (item == false) {
                validation = false
            }

        })

        return validation




    },

}

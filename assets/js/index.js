const tableDatas = document.getElementById('table-data');
const tableInfo = document.getElementById('table-info');

const tableDatasBody = tableDatas.querySelector('tbody');
const tableInfoBody = tableInfo.querySelector('tbody');

const iptLinhas = document.getElementById('quantidade-linhas');

const exibirTabela = (qtdLinhas) => {
    const inputs = [];
    tableDatasBody.innerHTML = '';

    if (qtdLinhas <= 1) {
        const tableRow = document.createElement('tr');
        const tableData = document.createElement('td');

        tableData.setAttribute('colspan', '2');
        tableData.innerHTML = 'Insira um valor válido';

        tableRow.append(tableData);
        tableDatasBody.append(tableRow);
        return false;
    }

    for (let i = 0; i < qtdLinhas; i++) {
        const tableRow = document.createElement('tr');
        const tableDataX = document.createElement('td');
        const tableDataInputX = document.createElement('input');
        const tableDataY = document.createElement('td');
        const tableDataInputY = document.createElement('input');

        tableDataInputX.setAttribute('type', 'number');
        tableDataInputY.setAttribute('type', 'number');
        inputs.push(tableDataInputX, tableDataInputY);

        tableDataX.append(tableDataInputX);
        tableDataY.append(tableDataInputY);

        tableRow.append(tableDataX, tableDataY);
        tableDatasBody.append(tableRow);
    }

    window.alert('preencha todos os campos da tabela');

    return inputs;
};

function verificaInputs(numeroLinhas, inputs) {
    let verificador = inputs.length;
    let inputDados = [];
    let inputDadosOrganizados = [];

    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            if (e.target.value != '') {
                inputDados.push(Number(e.target.value));
                verificador--;
            } else verificador++;

            if (verificador === 0) {
                for (let i = 0; i < inputDados.length; i += 2) {
                    inputDadosOrganizados.push({
                        x: inputDados[i],
                        y: inputDados[i + 1],
                    });
                }

                console.log(inputDadosOrganizados);
                calculo(numeroLinhas, inputDadosOrganizados);
                return inputDadosOrganizados;
            }
        });
    });
}

function exibirTabelaResultado(resultados) {
    tableInfoBody.innerHTML = '';

    for (let i = 0; i < resultados.length; i++) {
        const tableRow = document.createElement('tr');
        const tableDataInfo = document.createElement('td');
        const tableDataValor = document.createElement('td');

        tableDataInfo.innerHTML = resultados[i].nome;
        tableDataValor.innerHTML = resultados[i].valor;

        tableRow.append(tableDataInfo, tableDataValor);
        tableInfoBody.append(tableRow);
    }
}

function somatoriaX(data) {
    let somatoria = 0;

    data.forEach((item) => {
        somatoria += item.x;
    });

    return somatoria;
}

function somatoriaY(data) {
    let somatoria = 0;

    data.forEach((item) => {
        somatoria += item.y;
    });

    return somatoria;
}

function somatoriaXY(data) {
    let somatoria = 0;

    data.forEach((item) => {
        somatoria += item.x * item.y;
    });

    return somatoria;
}

function somatoriaXQuadrado(data) {
    let somatoria = 0;

    data.forEach((item) => {
        somatoria += Math.pow(item.x, 2);
    });

    return somatoria;
}

function somatoriaYQuadrado(data) {
    let somatoria = 0;

    data.forEach((item) => {
        somatoria += Math.pow(item.y, 2);
    });

    return somatoria;
}

function calculo(numeroLinhas, dadosAtuais) {
    console.log(dadosAtuais);
    if (dadosAtuais) {
        let somX = somatoriaX(dadosAtuais);
        let somY = somatoriaY(dadosAtuais);
        let somXY = somatoriaXY(dadosAtuais);
        let somXQuadrado = somatoriaXQuadrado(dadosAtuais);
        let somYQuadrado = somatoriaYQuadrado(dadosAtuais);

        let sxx = somXQuadrado - Math.pow(somX, 2) / numeroLinhas;

        let syy = somYQuadrado - Math.pow(somY, 2) / numeroLinhas;

        let sxy = somXY - (somX * somY) / numeroLinhas;

        let r = sxy / Math.sqrt(sxx * syy);
        let coeficienteExplicacao = Number((Math.pow(r, 2) * 100).toFixed(2));

        let relacionamento;
        if (r > 0) {
            relacionamento = 'temos um relacionamento diretamente proporcional';
        } else if (r < 0) {
            relacionamento =
                'temos um relacionamento inversamente proporcional';
        } else {
            relacionamento = 'não temos relacionamento';
        }

        let intensidade;
        if (r > 0.8 && r <= 1) {
            intensidade = 'forte';
        } else if (r > 0.5 && r <= 0.8) {
            intensidade = 'médio';
        } else if (r >= -0.5 && r <= 0.5) {
            intensidade = 'fraco';
        } else if (r >= -0.8 && r < -0.5) {
            intensidade = 'médio';
        } else if (r >= -1 && r < -0.8) {
            intensidade = 'forte';
        }

        let interpretacao = `Portanto, ${relacionamento} e ${intensidade}, onde ${coeficienteExplicacao}% do Y é explicado pelo X.`;

        let coeficienteInclinacao = sxy / sxx;
        let coeficienteLinear =
            somY / numeroLinhas - (coeficienteInclinacao * somX) / numeroLinhas;

        let retaRegressao;
        coeficienteLinear > 0
            ? (retaRegressao = `${coeficienteInclinacao.toFixed(
                  4
              )}X+${coeficienteLinear.toFixed(4)}`)
            : (retaRegressao = `${coeficienteInclinacao.toFixed(
                  4
              )}X${coeficienteLinear.toFixed(4)}`);

        console.log(
            `Som X: ${somX} | Som Y: ${somY} | Som XY: ${somXY} | Som X^2: ${somXQuadrado} | Som Y^2: ${somYQuadrado} | SXX: ${sxx} | SYY: ${syy} | SXY: ${sxy} | r: ${r} | R: ${coeficienteExplicacao} | Coef Inclinacao: ${coeficienteInclinacao} | Coef Linear: ${coeficienteLinear} | Reta Regressao: ${retaRegressao} | Interpretação: ${interpretacao}`
        );

        exibirTabelaResultado([
            {
                nome: 'Somatória X',
                valor: somX,
            },
            {
                nome: 'Somatória Y',
                valor: somY,
            },
            {
                nome: 'Somatória XY',
                valor: somXY,
            },
            {
                nome: 'Somatória X²',
                valor: somXQuadrado,
            },
            {
                nome: 'Somatória Y²',
                valor: somYQuadrado,
            },
            {
                nome: 'Somatória XY',
                valor: somXY,
            },
            {
                nome: 'SXX',
                valor: sxx,
            },
            {
                nome: 'SYY',
                valor: syy,
            },
            {
                nome: 'SXY',
                valor: sxy,
            },
            {
                nome: 'r',
                valor: r,
            },
            {
                nome: 'Coeficiente de Explicação (R)',
                valor: coeficienteExplicacao + '%',
            },
            {
                nome: 'Coeficiente de Inclinação (a)',
                valor: coeficienteInclinacao,
            },
            {
                nome: 'Coeficiente Linear (b)',
                valor: coeficienteLinear,
            },
            {
                nome: 'Reta de Regressão',
                valor: retaRegressao,
            },
            {
                nome: 'Interpretação',
                valor: interpretacao,
            },
        ]);

        let dadosOrdenados = dadosAtuais.slice().sort((a, b) => a.x - b.x);
        dadosOrdenados = dadosOrdenados.slice().sort((a, b) => a.y - b.y);

        grafico(dadosOrdenados);
    } else {
        exibirTabelaResultado([
            {
                nome: 'Erro',
                valor: 'Erro',
            },
        ]);
    }
}

iptLinhas.addEventListener('change', (e) => {
    let numeroLinhas = Number(e.target.value);

    let inputs = exibirTabela(numeroLinhas);

    verificaInputs(numeroLinhas, inputs);
});

function grafico(dadosOrdenados) {
    // setup block
    const data = {
        labels: dadosOrdenados.map((item) => item.x),
        datasets: [
            {
                label: 'Reta de Regressão',
                data: dadosOrdenados.map((item) => item.y),
                borderWidth: 1,
            },
        ],
    };

    // config block
    const config = {
        type: 'line',
        data,
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                },
            },
        },
    };

    let status = Chart.getChart('retaRegressao');
    if (status != undefined) {
        status.destroy();
    }

    new Chart(document.getElementById('retaRegressao'), config);
}

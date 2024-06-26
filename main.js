let inputCounter = 0;
let myChart = null;
let dataCount = 0;

function createInitialInput() {
    dataCount = parseInt(document.getElementById('dataPerLabel').value);
    const inputSection = document.getElementById('inputSection');
    inputSection.innerHTML = ''; // 기존 입력창을 초기화
    addDataTable();
}

function addDataTable() {
    const inputSection = document.getElementById('inputSection');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    // Creating table headers
    const labelHeader = document.createElement('th');
    labelHeader.innerText = '라벨명';
    headerRow.appendChild(labelHeader);

    for (let i = 0; i < dataCount; i++) {
        const dataHeader = document.createElement('th');
        dataHeader.innerText = `데이터 ${i + 1}의 이름`;
        headerRow.appendChild(dataHeader);

        const valueHeader = document.createElement('th');
        valueHeader.innerText = `데이터 ${i + 1}`;
        headerRow.appendChild(valueHeader);
    }

    const addButtonHeader = document.createElement('th');
    addButtonHeader.innerText = '추가';
    headerRow.appendChild(addButtonHeader);

    table.appendChild(headerRow);

    // Creating initial input row
    addTableRow(table);

    inputSection.appendChild(table);
}

function addTableRow(table) {
    const newRow = document.createElement('tr');
    newRow.id = `inputContainer${inputCounter}`;

    const labelCell = document.createElement('td');
    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.placeholder = '라벨명을 입력하세요.';
    labelInput.className = 'labelInput';
    labelCell.appendChild(labelInput);
    newRow.appendChild(labelCell);

    for (let i = 0; i < dataCount; i++) {
        const dataLabelCell = document.createElement('td');
        const dataLabelInput = document.createElement('input');
        dataLabelInput.type = 'text';
        dataLabelInput.placeholder = `데이터 ${i + 1}의 이름을 입력하세요.`;
        dataLabelInput.className = 'dataLabelInput';
        dataLabelCell.appendChild(dataLabelInput);
        newRow.appendChild(dataLabelCell);

        const dataCell = document.createElement('td');
        const dataInput = document.createElement('input');
        dataInput.type = 'number';
        dataInput.placeholder = `데이터 ${i + 1}`;
        dataInput.className = 'dataInput';
        dataCell.appendChild(dataInput);
        newRow.appendChild(dataCell);
    }

    const addButtonCell = document.createElement('td');
    const addButton = document.createElement('button');
    addButton.innerText = 'Add';
    addButton.onclick = () => addTableRow(table);
    addButtonCell.appendChild(addButton);
    newRow.appendChild(addButtonCell);

    table.appendChild(newRow);

    inputCounter++;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
}

function getRandomBorderColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}

function showChart() {
    const chartTitle = document.getElementById('chartTitle').value;
    const chartType = document.getElementById('chartType').value;
    const labelInputs = document.querySelectorAll('.labelInput');
    const dataLabelInputs = document.querySelectorAll('.dataLabelInput');
    const dataInputs = document.querySelectorAll('.dataInput');

    let chartData = [];
    let datasets = [];
    let dataLabels = [];
    let dataValues = {};

    for (let i = 0; i < labelInputs.length; i++) {
        const label = labelInputs[i].value;
        chartData.push(label);

        for (let j = 0; j < dataCount; j++) {
            const dataLabelIndex = i * dataCount + j;
            const dataLabel = dataLabelInputs[dataLabelIndex].value;
            const data = parseFloat(dataInputs[dataLabelIndex].value);

            if (!dataValues[dataLabel]) {
                dataValues[dataLabel] = [];
            }

            // Ensure all data arrays are of the same length
            if (dataValues[dataLabel].length < chartData.length - 1) {
                while (dataValues[dataLabel].length < chartData.length - 1) {
                    dataValues[dataLabel].push(null);
                }
            }

            dataValues[dataLabel].push(data);
        }
    }

    // Ensure all data arrays are of the same length
    for (const dataLabel in dataValues) {
        while (dataValues[dataLabel].length < chartData.length) {
            dataValues[dataLabel].push(null);
        }
    }

    for (const [label, values] of Object.entries(dataValues)) {
        datasets.push({
            label: label,
            data: values,
            backgroundColor: getRandomColor(),
            borderColor: getRandomBorderColor(),
            borderWidth: 1
        });
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: chartData,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                }
            }
        }
    });

    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('chartModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('chartModal').style.display = 'none';
}

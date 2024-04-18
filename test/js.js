let i=1;
const data = [
[i++, "Abhishek", "N/A", "./data/Abhishek/1.bmp", "./data/Abhishek/2.bmp", "./data/Abhishek/3.bmp", "./data/Abhishek/4.bmp", "./data/Abhishek/5.bmp"],
  [i++, "Anubhav", "N/A", "./data/Anubhav/1.bmp", "./data/Anubhav/2.bmp", "./data/Anubhav/3.bmp", "./data/Anubhav/4.bmp", "./data/Anubhav/5.bmp"],
  [i++, "Ashish", "N/A", "./data/Ashish/1.bmp", "./data/Ashish/2.bmp", "./data/Ashish/3.bmp", "./data/Ashish/4.bmp", "./data/Ashish/5.bmp"],
  [i++, "Ashish smi", "N/A", "./data/ashish smi/1.bmp", "./data/ashish smi/2.bmp", "./data/ashish smi/3.bmp", "./data/ashish smi/4.bmp", "./data/ashish smi/5.bmp"],
  [i++, "Neha", "N/A", "./data/Neha/1.bmp", "./data/Neha/2.bmp", "./data/Neha/3.bmp", "./data/Neha/4.bmp", "./data/Neha/5.bmp"],
  [i++, "Shalu", "N/A", "./data/Shalu/1.bmp", "./data/Shalu/2.bmp", "./data/Shalu/3.bmp", "./data/Shalu/4.bmp", "./data/Shalu/5.bmp"],
  [i++, "Shashikant", "N/A", "./data/Shashikant/1.bmp", "./data/Shashikant/2.bmp", "./data/Shashikant/3.bmp", "./data/Shashikant/4.bmp", "./data/Shashikant/5.bmp"],
  [i++, "Shiv", "N/A", "./data/Shiv/1.bmp", "./data/Shiv/2.bmp", "./data/Shiv/3.bmp", "./data/Shiv/4.bmp", "./data/Shiv/5.bmp"],
  [i++, "Shivam", "N/A", "./data/Shivam/1.bmp", "./data/Shivam/2.bmp", "./data/Shivam/3.bmp", "./data/Shivam/4.bmp", "./data/Shivam/5.bmp"],
  [i++, "Sushila", "N/A", "./data/Sushila/1.bmp", "./data/Sushila/2.bmp", "./data/Sushila/3.bmp", "./data/Sushila/4.bmp", "./data/Sushila/5.bmp"],

];

let currentSortColumn = -1; // Initially, no column is sorted
let isAscending = true; // Initially, sorting is in ascending order

document.addEventListener('DOMContentLoaded', function () {
    renderTable(data);
    
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredData = data.filter(row => row.some(cell => cell.toString().toLowerCase().includes(searchTerm)));
        renderTable(filteredData);
    });

    const contrastRange = document.getElementById('contrast');
    contrastRange.addEventListener('input', function () {
        const contrastValue = this.value;
        document.querySelector('.contrast-value').textContent = `${contrastValue}%`;
        updateImageContrast(contrastValue);
    });
});

function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');

        row.forEach((cell, index) => {
            const td = document.createElement('td');

            if (index >= 3 && index <= 7) {
                const img = document.createElement('img');
                img.src = cell;
                img.alt = `Finger ${index - 1}`;
                img.style.width = '100px'; // Set width to auto for actual size
                img.style.height = '100px'; // Set height to auto for actual size
                img.style.transform = 'scaleX(-1)'; // Mirror horizontally
                img.style.filter = `invert(100%) contrast(${document.getElementById('contrast').value}%)`; // Color invert and apply contrast
                td.appendChild(img);
            } else {
                td.textContent = cell;
            }

            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });

    updateTotalCount(data.length);
}

function updateImageContrast(contrastValue) {
    const images = document.querySelectorAll('td img');
    images.forEach(img => {
        img.style.filter = `invert(100%) contrast(${contrastValue}%)`;
    });
}

function updateTotalCount(count) {
    const totalCountElement = document.getElementById('totalCount');
    totalCountElement.textContent = `Total Count: ${count}`;
}

function sortTable(columnIndex) {
    if (currentSortColumn === columnIndex) {
        // If the same column is clicked again, reverse the sorting order
        isAscending = !isAscending;
    } else {
        // If a new column is clicked, set the sorting order to ascending
        isAscending = true;
        currentSortColumn = columnIndex;
    }

    data.sort((a, b) => {
        const valueA = a[currentSortColumn];
        const valueB = b[currentSortColumn];

        // Customize the comparison logic based on the data type (string, number, etc.)
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    renderTable(data);
}

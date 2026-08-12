const arrayContainer = document.getElementById("arrayContainer");

const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");

const sizeValue = document.getElementById("sizeValue");
const speedValue = document.getElementById("speedValue");

const algorithmSelect = document.getElementById("algorithm");

const generateBtn = document.getElementById("generateBtn");
const sortBtn = document.getElementById("sortBtn");

const algorithmName = document.getElementById("algorithmName");
const description = document.getElementById("description");

const best = document.getElementById("best");
const average = document.getElementById("average");
const worst = document.getElementById("worst");

let array = [];
let sorting = false;


/* Generate Random Array */

function generateArray() {

    array = [];

    const size = Number(sizeSlider.value);

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 5);
    }

    displayArray();
}


/* Display Array */

function displayArray() {

    arrayContainer.innerHTML = "";

    array.forEach((value) => {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = `${value}%`;

        arrayContainer.appendChild(bar);
    });
}


/* Delay*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* Animation Speed */

function getSpeed() {

    const speed = Number(speedSlider.value);

    return 101 - speed;
}


/* Get Bars */

function getBars() {
    return document.querySelectorAll(".bar");
}


/* Bubble Sort */

async function bubbleSort() {

    const bars = getBars();

    for (let i = 0; i < array.length; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            if (!sorting) return;

            bars[j].classList.add("compare");
            bars[j + 1].classList.add("compare");

            await sleep(getSpeed());

            if (array[j] > array[j + 1]) {

                bars[j].classList.remove("compare");
                bars[j + 1].classList.remove("compare");

                bars[j].classList.add("swap");
                bars[j + 1].classList.add("swap");

                await sleep(getSpeed());

                // Swap values
                let temp = array[j];

                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap heights
                bars[j].style.height = `${array[j]}%`;
                bars[j + 1].style.height = `${array[j + 1]}%`;

                await sleep(getSpeed());

                bars[j].classList.remove("swap");
                bars[j + 1].classList.remove("swap");
            } else {

                bars[j].classList.remove("compare");
                bars[j + 1].classList.remove("compare");
            }
        }

        bars[array.length - i - 1].classList.add("sorted");
    }
}


/*  Merge Sort*/

async function mergeSort(start, end) {

    if (start >= end || !sorting) return;

    const middle = Math.floor((start + end) / 2);

    await mergeSort(start, middle);

    await mergeSort(middle + 1, end);

    await merge(start, middle, end);
}


async function merge(start, middle, end) {

    const left = array.slice(start, middle + 1);
    const right = array.slice(middle + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    const bars = getBars();

    while (i < left.length && j < right.length) {

        if (!sorting) return;

        bars[start + i].classList.add("compare");

        await sleep(getSpeed());

        if (left[i] <= right[j]) {

            array[k] = left[i];
            i++;

        } else {

            array[k] = right[j];
            j++;
        }

        bars[k].style.height = `${array[k]}%`;

        bars[k].classList.remove("compare");

        bars[k].classList.add("swap");

        await sleep(getSpeed());

        bars[k].classList.remove("swap");

        k++;
    }

    while (i < left.length) {

        if (!sorting) return;

        array[k] = left[i];

        bars[k].style.height = `${array[k]}%`;

        i++;
        k++;

        await sleep(getSpeed());
    }

    while (j < right.length) {

        if (!sorting) return;

        array[k] = right[j];

        bars[k].style.height = `${array[k]}%`;

        j++;
        k++;

        await sleep(getSpeed());
    }
}


/* Quick Sort */

async function quickSort(low, high) {

    if (low >= high || !sorting) return;

    const pivotIndex = await partition(low, high);

    await quickSort(low, pivotIndex - 1);

    await quickSort(pivotIndex + 1, high);
}


async function partition(low, high) {

    const bars = getBars();

    const pivot = array[high];

    bars[high].classList.add("compare");

    let i = low;

    for (let j = low; j < high; j++) {

        if (!sorting) return low;

        bars[j].classList.add("compare");

        await sleep(getSpeed());

        if (array[j] < pivot) {

            // Swap
            let temp = array[i];

            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = `${array[i]}%`;
            bars[j].style.height = `${array[j]}%`;

            bars[i].classList.add("swap");
            bars[j].classList.add("swap");

            await sleep(getSpeed());

            bars[i].classList.remove("swap");
            bars[j].classList.remove("swap");

            i++;
        }

        bars[j].classList.remove("compare");
    }

    // Put pivot in correct position
    let temp = array[i];

    array[i] = array[high];
    array[high] = temp;

    bars[i].style.height = `${array[i]}%`;
    bars[high].style.height = `${array[high]}%`;

    bars[high].classList.remove("compare");

    bars[i].classList.add("sorted");

    await sleep(getSpeed());

    return i;
}


/*Mark Everything Sorted */

async function markSorted() {

    const bars = getBars();

    for (let i = 0; i < bars.length; i++) {

        bars[i].classList.add("sorted");

        await sleep(10);
    }
}


/* Start Sorting */

async function startSorting() {

    if (sorting) return;

    sorting = true;

    sortBtn.disabled = true;
    generateBtn.disabled = true;
    algorithmSelect.disabled = true;
    sizeSlider.disabled = true;

    const bars = getBars();

    bars.forEach(bar => {
        bar.classList.remove("sorted");
    });

    const algorithm = algorithmSelect.value;

    if (algorithm === "bubble") {

        await bubbleSort();

    } else if (algorithm === "merge") {

        await mergeSort(0, array.length - 1);

    } else if (algorithm === "quick") {

        await quickSort(0, array.length - 1);
    }

    if (sorting) {
        await markSorted();
    }

    sorting = false;

    sortBtn.disabled = false;
    generateBtn.disabled = false;
    algorithmSelect.disabled = false;
    sizeSlider.disabled = false;
}


/* Algorithm Information*/

function updateAlgorithmInfo() {

    const algorithm = algorithmSelect.value;

    if (algorithm === "bubble") {

        algorithmName.textContent = "Bubble Sort";

        description.textContent =
            "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.";

        best.textContent = "O(n)";
        average.textContent = "O(n²)";
        worst.textContent = "O(n²)";

    } else if (algorithm === "merge") {

        algorithmName.textContent = "Merge Sort";

        description.textContent =
            "Merge Sort divides the array into smaller parts, sorts them, and then merges the sorted parts.";

        best.textContent = "O(n log n)";
        average.textContent = "O(n log n)";
        worst.textContent = "O(n log n)";

    } else if (algorithm === "quick") {

        algorithmName.textContent = "Quick Sort";

        description.textContent =
            "Quick Sort selects a pivot and partitions the array around the pivot before recursively sorting the parts.";

        best.textContent = "O(n log n)";
        average.textContent = "O(n log n)";
        worst.textContent = "O(n²)";
    }
}


/*  Event Listeners*/

sizeSlider.addEventListener("input", () => {

    sizeValue.textContent = sizeSlider.value;

    if (!sorting) {
        generateArray();
    }
});


speedSlider.addEventListener("input", () => {

    speedValue.textContent = speedSlider.value;
});


algorithmSelect.addEventListener("change", () => {

    updateAlgorithmInfo();
});


generateBtn.addEventListener("click", () => {

    if (!sorting) {
        generateArray();
    }
});


sortBtn.addEventListener("click", () => {

    startSorting();
});


/* Initial Setup*/

sizeValue.textContent = sizeSlider.value;
speedValue.textContent = speedSlider.value;

updateAlgorithmInfo();

generateArray();
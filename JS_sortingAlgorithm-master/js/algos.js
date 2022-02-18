// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    var GrenobleLat = 45.166667;
    var GrenobleLong = 5.716667;

    const R = 6371e3; // metres
    const φ1 = city.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = GrenobleLat * Math.PI / 180;
    const Δφ = (city.latitude - GrenobleLat) * Math.PI / 180;
    const Δλ = (city.longitude - GrenobleLong) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = (R * c) / 1000; // in metres
    return d;

}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display);

    console.log(csvData[i]);
    console.log(csvData[j]);

    let k = csvData[i];
    console.log(k);

    csvData[i] = csvData[j];
    console.log(csvData[i]);

    csvData[j] = k;
    console.log(csvData[j]);
    console.log(k);

}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)

    return distanceFromGrenoble(i) < distanceFromGrenoble(j);
}


function insertsort(numbersInsert) {

    for (let i = 1; i < numbersInsert.length; i++) {
        let minimum = numbersInsert[i];
        let j = i;

        while (j > 0 && numbersInsert[j - 1] > minimum) {
            numbersInsert[j] = numbersInsert[j - 1];
            j = j - 1;

        }
        numbersInsert[j] = minimum;

    }
    return numbersInsert;
}

function selectionsort(data) {
    for (let i = 0; i < data.length; i++) {
        let minimum = i;
        for (let j = i + 1; j < data.length; j++) {
            if (isLess(data[j], data[minimum])) {
                minimum = j;
            }
        }
        var others = data[i];
        data[i] = data[minimum];
        data[minimum] = others;
    }
    return data;
}

function bubblesort(numbersBubbles) {

    let tableSorted;
    do {
        tableSorted = false;
        for (let j = 0; j < numbersBubbles.length - 1; j++) {
            if (numbersBubbles[j] > numbersBubbles[j + 1]) {

                let minimum = numbersBubbles[j];
                numbersBubbles[j] = numbersBubbles[j + 1];
                numbersBubbles[j + 1] = minimum;
                tableSorted = true;
            }
        }

    } while (tableSorted);
    return numbersBubbles;
}

var espacements = [701, 301, 132, 57, 23, 10, 4, 1]

function shellsort(a) {
    let n = a.length;
    for (let e in espacements) {
        for (let i = e; i <= n.length; i++) {
            let temp = a[i];
            let j = i;
            while (j >= e && a[j - e] > temp) {
                a[j] = a[j - e];
                j -= e;
            }
            a[j] = temp;
        }
    }
    return a;
}

function mergesort(tableau) {

    if (tableau.length <= 1) {
        return tableau;
    } else {
        //triFusion(T[1, …, n/2])

        return merge(
            mergesort(tableau.slice(0, Math.floor(tableau.length / 2))),
            mergesort(tableau.slice(Math.floor(tableau.length / 2)), tableau.length)
        );
    }
}


function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
             result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while(left.length)  result.push(left.shift());
    while(right.length) result.push(right.shift());
    return result;
}

function heapsort() {
    console.log("heapsort - implement me !");
}


function partition(table, first, last) {
    var pivot   = table[Math.floor((last + first) / 2)],
        i       = first,
        j       = last;
    while (i <= j) {
        while (table[i] < pivot) {
            i++;
        }
        while (table[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(table, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(table, first, last) {
    var index;
    if (table.length > 1) {
        index = partition(table, first, last);
        if (first < index - 1) {
            quickSort(table, first, index - 1);
        }
        if (index < last) {
            quickSort(table, index, last);
        }
    }
    return table;
}

function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}

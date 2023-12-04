import * as React from "react";
import textfile from "./resources/3.reddit.txt"

export const Day3 = () => {
    const [data, setData] = React.useState(null);

    const reg = new RegExp('^[0-9]+$');

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
      }

    const checkValidity = (m, i, first, last) => {
        let indices = [
            [Math.max(0, i-1), Math.max(0, first-1)],
            [Math.max(0, i-1), Math.min(m[i].length -1, last+1)],
            [i, Math.max(0, first-1)],
            [i, Math.min(m[i].length -1, last+1)],
            [Math.min(i+1, m.length -1), Math.max(0, first-1)],
            [Math.min(i+1, m.length -1), Math.min(m[i].length -1, last+1)]
        ]

        for (let j=first; j < Math.min(m[i].length -1, last+1); j++) {
            indices.push([Math.max(0, i-1), j])
            indices.push([i, j])
            indices.push([Math.min(i+1, m[i].length -1), j])
        }

        return indices.some(index => m[index[0]][index[1]] !== "." && !reg.test(m[index[0]][index[1]]));
    }

    const getNumbersAdjacent = (m, i, j) => {
        let indices = [
            [Math.max(0, i-1), Math.max(0, j-1)],
            [Math.max(0, i-1), Math.min(m[i].length -1, j+1)],
            [i, Math.max(0, j-1)],
            [i, Math.min(m[i].length -1, j+1)],
            [Math.min(i+1, m.length -1), Math.max(0, j-1)],
            [Math.min(i+1, m.length -1), Math.min(m[i].length -1, j+1)]
        ]

        return indices.filter(index => reg.test(m[index[0]][index[1]]));
    }

    const parseNumberAtIndex = (matrix, i, j) => {
        const numberString = [];

        for (let left = j; left > -1; left--) {
            if (reg.test(matrix[i][left])) {
                numberString.splice(0, 0, matrix[i][left])
            } else {
                break;
            }
        }

        for (let right = j+1; right < matrix[i].length; right++) {
            if (reg.test(matrix[i][right])) {
              numberString.push(matrix[i][right])
            } else {
                break;
            }
        }

        return numberString.join("")
    }

    React.useEffect(() => {
        fetch(textfile).then((txt) => {
            txt.text().then((t) => {
                let data = t.split("\n")
                setData(data);
            })   
        })
    }, []);

    const getSolution1 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let total = 0;
        let matrix = data.map(row => row.split(""));
        let numbers = data.map(row => row.split(/[^0-9]/).filter(row => row !== ""));

        numbers.forEach((numberList, index) => {
            if (numberList.length > 0) {
                let lastParsedNumberIndex = 0;
                numberList.forEach((num) => {
                    let matrixFirstIndex = lastParsedNumberIndex + getPosition(data[index].slice(lastParsedNumberIndex), num, 1);
                    let matrixLastIndex = matrixFirstIndex + num.length -1;
                    if(checkValidity(matrix, index, matrixFirstIndex, matrixLastIndex)) {
                        total += parseInt(num);
                    }
                    lastParsedNumberIndex = matrixLastIndex
                })
            }
        })

        return total
    }

    const getSolution2 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let total = 0;
        let matrix = data.map(row => row.split(""));

        matrix.forEach((row, i) => {
            row.forEach((col, j) => {
                if (matrix[i][j] === "*") {
                    let indicesOfNumbers = getNumbersAdjacent(matrix, i, j);
                    let parsedNumbers = [];
                    indicesOfNumbers.forEach((index) => {
                        parsedNumbers.push(parseNumberAtIndex(matrix, index[0], index[1]));
                    })

                    let uniqueNumbers = new Set(parsedNumbers);
                    if (parsedNumbers.length < 3 && uniqueNumbers.size < 2) {
                        console.log(parsedNumbers);
                        total += [...parsedNumbers].reduce((partial, x) => partial * x);    

                    }
                }
            })
        })

        // TODO handle when the same number appears on a gear. i.e. 78 * 78 is valid
        // TODO handle when there's two unique numbers but more than two numbers on the gear. i.e. 2.5 * 5 is invalid

        return total
    }

    return <div>
        {getSolution1(data)}<br/>
        {getSolution2(data)}
    </div> 
}
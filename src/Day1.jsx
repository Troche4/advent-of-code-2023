import * as React from "react";
import textfile from "./resources/1.txt"

export const Day1 = () => {
    const [data, setData] = React.useState(null);

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

        let rowNumbers = [];
        data.forEach((row) => {
            let numberString = row.split("").filter(char => ['1','2','3','4','5','6','7','8','9','0'].includes(char));
            if (numberString.length === 1) {
                rowNumbers.push(numberString + numberString);
            } else {
                rowNumbers.push(numberString[0] + numberString[numberString.length -1]);
            }
        })

        let total = 0
        rowNumbers.forEach((n) => {
            total += parseInt(n)
        })

        return total
    }

    const getSolution2 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let rowNumbers = [];
        data.forEach((row) => {
            row = row.replaceAll("oneight", "oneeight")
            row = row.replaceAll("threeight", "threeeight")
            row = row.replaceAll("fiveeight", "fiveeight")
            row = row.replaceAll("nineight", "nineeight")
            row = row.replaceAll("eightwo", "eighttwo")
            row = row.replaceAll("eighthree", "eightthree")
            row = row.replaceAll("twone", "twoone")
            row = row.replaceAll("sevenine", "sevennine")
            row = row.replaceAll("one", "1");
            row = row.replaceAll("two", "2");
            row = row.replaceAll("three", "3");
            row = row.replaceAll("four", "4");
            row = row.replaceAll("five", "5");
            row = row.replaceAll("six", "6");
            row = row.replaceAll("seven", "7");
            row = row.replaceAll("eight", "8");
            row = row.replaceAll("nine", "9");
            let numberString = row.split("").filter(char => ['1','2','3','4','5','6','7','8','9','0'].includes(char));
            if (numberString.length === 1) {
                rowNumbers.push(numberString + numberString);
            } else {
                rowNumbers.push(numberString[0] + numberString[numberString.length -1]);
            }
        })

        let total = 0
        rowNumbers.forEach((n) => {
            total += parseInt(n)
        })

        return total;
    }

    return <div>
        {getSolution1(data)}<br/>
        {getSolution2(data)}
    </div> 
}
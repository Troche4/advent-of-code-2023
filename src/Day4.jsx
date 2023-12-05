import * as React from "react";
import textfile from "./resources/4.txt"

export const Day4 = () => {
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

        let cardPoints = [];
        data.forEach((row) => {
            let points = 0;
            let cards = row.split(" | ");
            let yourNumbers = cards[1].split(" ").filter(x => x !== "").map(x => parseInt(x.trim()));
            let left = cards[0].split(" ").filter(x => x !== "");
            let cardId = left[1].slice(0, 1);
            let winningNumbers = left.splice(2).map((x) => parseInt(x));
            yourNumbers.forEach((yours) => {
                if (winningNumbers.includes(yours)) {
                    points = (Math.max(points, 1)) * 2
                }
            })
            cardPoints.push(points / 2);
        })

        return cardPoints.reduce((p, x) => p + x)
    }

    const getCopiesFromCardNumber = (copies, cardId) => {
        if (copies[cardId].length === 0) {
            return 1;
        } else {
            let count = 1;
            copies[cardId].forEach(cid => count += getCopiesFromCardNumber(copies, cid));
            return count;
        }
    }

    const getSolution2 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let copies = {}
        let newCopies = {}
        data.forEach((row, i) => {
            copies[i] = [];
            newCopies[i] = 0;
        })

        data.forEach((row, i) => {
            let cards = row.split(" | ");
            let yourNumbers = cards[1].split(" ").filter(x => x !== "").map(x => parseInt(x.trim()));
            let left = cards[0].split(" ").filter(x => x !== "");
            let cardId = left[1].slice(0, 1);
            let winningNumbers = left.splice(2).map((x) => parseInt(x));
            let winningNumberCount = 0;
            yourNumbers.forEach((yours, index) => {
                if (winningNumbers.includes(yours)) {
                    let cardIdToCopy = parseInt(cardId) + winningNumberCount + 1;
                    winningNumberCount += 1;
                    let cardList = copies[cardId];
                    cardList.push(cardIdToCopy);
                    copies[cardId] = cardList;
                }
            })
        })

        let count = 0;
        data.forEach((row, i) => {
            count += getCopiesFromCardNumber(copies, i)
        })
        return count;
    }

    return <div>
        {getSolution1(data)}<br/>
        {getSolution2(data)}
    </div> 
}
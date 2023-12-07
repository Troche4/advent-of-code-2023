import * as React from "react";
import textfile from "./resources/7.example.txt"

export const Day7 = () => {
    const [data, setData] = React.useState(null);

    const reg = new RegExp('^[0-9]+$');
    let cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

    React.useEffect(() => {
        fetch(textfile).then((txt) => {
            txt.text().then((t) => {
                let data = t.split("\n")
                setData(data);
            })   
        })
    }, []);

    const insertIntoList = (list, item) => {
        if (list.length === 0) {
            list.push(item.join(""));
            return;
        }

        list.forEach((h, ind) => {
            let chars = h.split("");
            for (let i=0; i< chars.length; i++) {
                if (chars[i] !== item[i]) {
                    // the existing list item is higher
                    if (cards.indexOf(chars[i]) < cards.indexOf(item[i])) {
                        list.splice(ind+1, 0, item.join(""));
                        return;
                    // the existing list item is lower
                    } else {
                        list.splice(ind-1, 0, item.join(""));
                        return;
                    }
                }
            }
        })
    }

    const getSolution1 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let bidByHand = {}

        let rankedHands = {
            "fiveOfAKind": [],
            "fourOfAKind": [],
            "fullHouse": [],
            "threeOfAKind": [],
            "twoPair": [],
            "onePair": [],
            "highCard": []
        };

        data.forEach((line) => {
            let hand = line.split(" ")[0].split("");
            let bid = line.split(" ")[1];
            bidByHand[line.split(" ")[0]] = line.split(" ")[1]

            let uniqueCharacters = {};
            hand.forEach((c) => {
                if (uniqueCharacters[c]) {
                    uniqueCharacters[c] += 1;
                } else {
                    uniqueCharacters[c] = 1;
                }
            })

            let keys = Object.keys(uniqueCharacters);
            if (uniqueCharacters.size === 1) {
                insertIntoList(rankedHands["fiveOfAKind"], hand);
            } else if (keys.some(k => uniqueCharacters[k] === 4)) {
                insertIntoList(rankedHands["fourOfAKind"], hand);
            } else if (keys.some(k => uniqueCharacters[k] === 3)) {
                if (keys.some(k => uniqueCharacters[k] === 2)) {
                    insertIntoList(rankedHands["fullHouse"], hand);
                } else {
                    insertIntoList(rankedHands["threeOfAKind"], hand);
                }
            } else if (keys.filter(k => uniqueCharacters[k] === 2).length > 1) {
                insertIntoList(rankedHands["twoPair"], hand)
            } else if (keys.some(k => uniqueCharacters[k] === 2)) {
                insertIntoList(rankedHands["onePair"], hand)
            } else {
                insertIntoList(rankedHands["highCard"], hand)
            }
        })

        //console.log(rankedHands)

        let handsByRank = [];
        Object.keys(rankedHands).forEach((k) => {
            let handList = rankedHands[k];
            handList.forEach((h, i) => {
                handsByRank.splice(0, 0, h)
            })
        });

        //console.log(handsByRank)

        let result = 0;
        handsByRank.forEach((hand, i) => {
            console.log(i+1, bidByHand[hand])
            result += (i + 1) * bidByHand[hand]
        })
        return result;
    }

    const getSolution2 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        return 0;
    }

    return <div>
        {getSolution1(data)}<br/>
        {getSolution2(data)}
    </div> 
}
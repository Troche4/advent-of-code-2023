import * as React from "react";
import textfile from "./resources/2.txt"

export const Day2 = () => {
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

        let sum = 0;
        data.forEach(row => {
            let gameId = row.split(": ")[0].split(" ")[1];
            console.log(row)
            let game = row.split(": ")[1];
            let rounds = game.split("; ");
            let valid = true;
            rounds.forEach(round => {
                let diceCounts = round.split(", ");
                diceCounts.forEach((count) => {
                    let countInfo = count.split(" ");
                    switch(countInfo[1]){
                        case "red":
                            if (parseInt(countInfo[0]) > 12) {
                                valid = false;
                            }
                            break;
                        case "green":
                            if (parseInt(countInfo[0]) > 13) {
                                valid = false;
                            }
                            break;
                        case "blue":
                            if (parseInt(countInfo[0]) > 14) {
                                valid = false;
                            } 
                            break;
                        default:
                            break;
                    }
                });
            });

            if (valid) {
                sum += parseInt(gameId);
            }
            valid = true;
        })

        return sum
    }

    const getSolution2 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let powers = [];
        data.forEach(row => {
            let game = row.split(": ")[1];
            let rounds = game.split("; ");
            let minimumCubes = {
                "red": 0,
                "blue": 0,
                "green": 0
            }

            rounds.forEach(round => {
                let diceCounts = round.split(", ");
                diceCounts.forEach((count) => {
                    let countInfo = count.split(" ");
                    switch(countInfo[1]){
                        case "red":
                            let redUsedThisRound = parseInt(countInfo[0]);
                            minimumCubes["red"] = Math.max(minimumCubes["red"], redUsedThisRound);
                            break;
                        case "green":   
                            let greenUsedThisRound = parseInt(countInfo[0]);
                            minimumCubes["green"] = Math.max(minimumCubes["green"], greenUsedThisRound);
                            break;
                        case "blue":
                            let blueUsedThisRound = parseInt(countInfo[0]);
                            minimumCubes["blue"] = Math.max(minimumCubes["blue"], blueUsedThisRound);
                            break;
                        default:
                            break;
                    }
                });
            });

            powers.push(minimumCubes["red"] * minimumCubes["blue"] * minimumCubes["green"]);

            minimumCubes = {
                "red": 0,
                "blue": 0,
                "green": 0
            }

        })

        return powers.reduce((p, x) => p + x)
    }

    return <div>
        {getSolution1(data)}<br/>
        {getSolution2(data)}
    </div> 
}
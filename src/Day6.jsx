import * as React from "react";
import textfile from "./resources/6.txt"

export const Day6 = () => {
    const [data, setData] = React.useState(null);

    const reg = new RegExp('^[0-9]+$');

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

        let times = data[0].split(" ").filter(time => reg.test(time)).map(x => parseInt(x));
        let distances = data[1].split(" ").filter(dist => reg.test(dist)).map(x => parseInt(x));
        
        let waysToWin = []
        times.forEach((t, i) => {
            let winnningStrats = 0;
            let record = distances[i]
            for (let i=0; i<t; i++) {
                let timeToTravel = t - i;
                let speed = i;
                let distanceTraveled = timeToTravel * speed;
                if (distanceTraveled > record) {
                    winnningStrats += 1;
                }
            }
            waysToWin.push(winnningStrats);
        })

        return waysToWin.reduce((p, x) => p * x);
    }

    const getSolution2 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let time = data[0].split(" ").filter(time => reg.test(time)).reduce((p, x) => p + x);
        let distance = data[1].split(" ").filter(dist => reg.test(dist)).reduce((p, x) => p + x);
        
        let waysToWin = []
        let winnningStrats = 0;
        for (let i=0; i<time; i++) {
            let timeToTravel = time - i;
            let speed = i;
            let distanceTraveled = timeToTravel * speed;
            if (distanceTraveled > distance) {
                winnningStrats += 1;
            }
        }

        return winnningStrats
    }

    return <div>
        {getSolution1(data)}<br/>
        {getSolution2(data)}
    </div> 
}
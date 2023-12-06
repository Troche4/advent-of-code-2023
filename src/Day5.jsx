import * as React from "react";
import textfile from "./resources/5.example.txt"

export const Day5 = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch(textfile).then((txt) => {
            txt.text().then((t) => {
                let data = t.split("\n\n")
                setData(data);
            })   
        })
    }, []);

    const getSolution1 = (data) => {
        if (data === null || data.length === 0) {
            return
        }

        let seeds = data[0].split(" ").splice(1).map(x => parseInt(x));
        let maps = []

        data.forEach((map, i) => {
            if (i > 0) {
                let lines = map.split("\n");
                let label = lines[0].replace(":", "");
                let m = {
                    0: (x) => x
                }
                lines.forEach((line, j) => {
                    if (j > 0) {
                        let dest = parseInt(line.split(" ")[0]);
                        let src = parseInt(line.split(" ")[1]);
                        let len = parseInt(line.split(" ")[2]);
                        m[src] = (x) => x + len
                    }                    
                })
                maps.push(m)
            }
        })

        console.log(maps[0])
        console.log(maps[0][50])
        let locations = []

        seeds.forEach((s, i) => {
            let temp = s;
            maps.forEach(m => {
                let found = false;
                Object.keys(m).forEach((k) => {
                    if (k < m && !found) {
                        temp = m[k](temp);
                        found = true;
                    }
                })
                found = false;
            })
            locations.push(temp)
        })
        
        return Math.min(...locations);
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
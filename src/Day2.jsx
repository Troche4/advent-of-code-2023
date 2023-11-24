import * as React from "react";
import textfile from "./resources/2.txt"

export const Day2 = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch(textfile).then((txt) => {
            txt.text().then((t) => {
                let data = t.split("\n").map(item => parseInt(item))
                setData(data);
            })   
        })
    }, []);

    const getSolution = (data) => {
        if (data == null || data.length == 0) {
            return
        }

        let out = [];

        for (let i = 0; i< data.length; i++) {
            if (i % 2 == 0) {
                out.push(data[i])
            }
        }
        return out.reduce((partialSum, x) => partialSum + x)
    }

    
    
    return <div>{getSolution(data)}</div> 
}
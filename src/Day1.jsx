import * as React from "react";
import textfile from "./resources/1.txt"

export const Day1 = () => {
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

        return data.reduce((partialSum, x) => partialSum + x)
    }

    
    
    return <div>{getSolution(data)}</div> 
}
import * as React from "react";
import textfile from "./resources/1.txt"

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
        if (data == null || data.length == 0) {
            return
        }

        return "one"
    }

    const getSolution2 = (data) => {
        if (data == null || data.length == 0) {
            return
        }

        return "two"
    }

    return <div>
        {getSolution1(data)}<br/>
        {getSolution2(data)}
    </div> 
}
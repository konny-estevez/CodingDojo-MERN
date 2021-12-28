import React from 'react'

const boxStyle = {
    border: "1px solid black",
    width: "150px",
    height: "150px",
    backgroundColor: "white",
}

const containerStyle = {
    display: "inline-block",
    marginTop: "30px",
    marginInline: "10px",
}

const setBoxColor = (item, i) => {
    let newStyle = {...boxStyle, backgroundColor: item};

    return <div key={i} style={containerStyle}>
        <div style={newStyle} ></div>
        <span>{item}</span>
    </div>;
}

export const Boxes = ({colorsList}) => {
    return (
        <div >
            {colorsList.map( (item, i) => setBoxColor(item, i) )}
        </div>
    )
}


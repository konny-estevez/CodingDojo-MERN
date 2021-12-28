import React from 'react'

const navStyle = {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    width: "100%",
    border: "1px solid black",
}

const itemStyle = {
    float: "left",
}

const buttonStyle = {
    marginInline: "5px",
}

const containerStyle = {
    border: "1px solid black",
    width: "100%",
    height: "40rem",
    display: "block",
}

const contentStyle = {
    width: "100%",
    height: "100%",
    //border: "1px dashed black",
    display: "none",
}

const divName = (tabId) => { return "div_" + tabId; }

const handleClick = (e, tabs) => {
    tabs.map((tab) => document.getElementById("div_" + tab.id).style.display = "none");
    document.getElementById("div_" + e.target.id).style.display = "block";
}

export const TabControl = ({tabs}) => {
    return (
        <>
            <ul style={navStyle}>
                <li style={itemStyle}>
                    { tabs.map((tab, i) => 
                        <button key={i} id={tab.id} className="btn-lg btn-primary" style={buttonStyle} onClick={e => handleClick(e, tabs)}>{tab.name}</button>)
                    }
                </li>
            </ul>
            <br/>
            <div id="content-container" style={containerStyle}>
                { tabs.map((tab, i) => <div key={i} style={contentStyle} id={divName(tab.id)}>
                    {tab.content}
                    </div>)
                }
            </div>
        </>
    )
}

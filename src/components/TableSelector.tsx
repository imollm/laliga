import React, { useEffect } from "react";
import useStore from "../store/index.js";
import TablePlayers from "../components/TablePlayers.js";
import TableClasification from "../components/TableClasification.js";
import TableMatches from "../components/TableMatches.js"
import TableStats from "../components/TableStats.js";

const TableSelector = () => {
    const { optionChoosed } = useStore();
    
    useEffect(() => {}, [optionChoosed]);

    return (
        <>
            {optionChoosed === "players" && <TablePlayers />}
            {optionChoosed === "clasification" && <TableClasification />}
            {optionChoosed === "matches" && <TableMatches />}
            {optionChoosed === "stats" && <TableStats />}
        </>
    );
};

export default TableSelector;

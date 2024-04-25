import * as React from 'react';
import {BiomData} from "../Models/BiomData";


const BiomTableElement: React.FC<BiomData> = (Data) => {

    return (
        <tr>
            <td>{Data.name}</td>
            <td>{Data.taxId}</td>
            <td>{Data.abundanceScore}</td>
            <td>{Data.relativeAbundance}</td>
            <td>{Data.uniqueMatchesFrequency}</td>
        </tr>
    );
};

export default BiomTableElement;

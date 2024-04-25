import * as React from 'react';
import BiomTableElement from '../Components/BiomTableElement';
import data from '../Data/biom.json';
import { BiomData } from '../Models/BiomData';
import '../Styles/BiomStyle.css';

const BiomTable: React.FC = () => {
    const rows = data.rows;

    const strainRows = React.useMemo(() => {
        return rows.filter((row: any) => row.metadata.lineage.length === 8);
    }, [rows]);

    const [tableData, setTableData] = React.useState<BiomData[]>([]);
    const [searchText, setSearchText] = React.useState<string>(''); // State for search text

    React.useEffect(() => {
        const filteredData = strainRows.map((row: any, index: number) => {
            const lineage = row.metadata.lineage;
            const level = lineage.length - 1;

            const name: string = lineage[level].name;
            const taxId: string = lineage[level].tax_id;

            let abundanceScore = 0;
            let relativeAbundance = '< 0.01%';
            let uniqueMatchesFrequency = 0;

            const rowData = data.data.filter((entry: number[]) => entry[0] === index);

            rowData.forEach((entry: number[]) => {
                const dataType = entry[1];
                const value = entry[2];

                if (dataType === 0) {
                    const percentage = value * 100;
                    if (percentage >= 0.01) {
                        relativeAbundance = percentage.toFixed(2) + '%';
                    } else {
                        relativeAbundance = '< 0.01%';
                    }
                } else if (dataType === 1) {
                    abundanceScore = value;
                } else if (dataType === 2) {
                    uniqueMatchesFrequency = value;
                }
            });

            const biomData: BiomData = {
                name,
                taxId,
                abundanceScore,
                relativeAbundance,
                uniqueMatchesFrequency,
            };

            return biomData;
        }).filter((biomData: BiomData) =>
            biomData.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setTableData(filteredData);
    }, [strainRows, searchText]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="wrapper">
            <h2>Biom Data Table</h2>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchText}
                onChange={handleSearchChange}
                style={{ marginBottom: '10px' }}
            />
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Tax ID</th>
                    <th>Abundance Score</th>
                    <th>Relative Abundance</th>
                    <th>Unique Matches Frequency</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((biomData, index) => (
                    <BiomTableElement key={index} {...biomData} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BiomTable;

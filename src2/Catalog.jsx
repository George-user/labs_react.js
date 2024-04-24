import { useState } from 'react';
import items from './items';

export default function ProductCatalog() {
    let [firstColumn, SetColumn] = useState(null);
    let sortOrder = useState('asc');

    let columns = [
        { key: 'id', label: '#' },
        { key: 'name', label: 'Название' },
        { key: 'price', label: 'Цена' },
        { key: 'amount', label: 'Количество' }
    ]

    let sortedItems = items.sort((a, b) => {
        let columnA = a[firstColumn];
        let columnB = b[firstColumn];

        if (sortOrder === 'asc') {
            if (columnA < columnB) return -1;
            if (columnA > columnB) return 1;
            return 0;
        } else {
            if (columnA > columnB) return -1;
            if (columnA < columnB) return 1;
            return 0;
        }
    });

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedItems.map((item, index) => (
                    <tr key={index} style={{ backgroundColor: item.amount < 3 && item.amount != 0 ? 'yellow' : item.amount === 0 ? 'red' : 'transparent' }}>
                        <td>{index}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2}>Total</td>
                    <td>{items.reduce((totalCost, item) => totalCost + item.amount * item.price, 0)}</td>
                    <td>{items.reduce((totalCost, item) => totalCost + item.amount, 0)}</td>
                </tr>
            </tfoot>
        </table>
    );
}

import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState(props.initialData);
    const [sort, setSort] = useState(props.sorting);
    const [editId, setEditId] = useState(-1);
    const [editedValue, setEditedValue] = useState('');

    useEffect(() => {
        setItems(
            props.sorting === 'ASC'
                ? items.sort((el_1, el_2) => el_1.id - el_2.id)
                : items.reverse(),
        );
        setSort(props.sorting);
    }, [props.sorting]);

    return (
        <div>
            {items.map((item) => {
                if (item.id !== editId)
                    return (
                        <p onClick={(e) => setEditId(item.id)}>{item.name}</p>
                    );
                else
                    return (
                        <input
                            type="text"
                            defaultValue={item.name}
                            onChange={(e) => setEditedValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') setEditId(-1);
                                if (e.key === 'Enter') {
                                    items.map((changedItem) => {
                                        if (item.id === changedItem.id)
                                            changedItem.name = editedValue;
                                    });
                                    setEditId(-1);
                                    setItems(items);
                                }
                            }}
                            key={item.id}
                        ></input>
                    );
            })}
        </div>
    );
}

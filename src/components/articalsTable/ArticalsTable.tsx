import { GetData, GetColumns  } from './ArticalsTableUtility';
import React, { useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Table } from 'antd';



const ArticalsTable: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const columns = GetColumns(
        searchText,
        searchedColumn,
        searchInput,
        setSearchText,
        setSearchedColumn
    );

    return <Table 
        columns={columns}
        dataSource={GetData()}
    />;
};

export default ArticalsTable;
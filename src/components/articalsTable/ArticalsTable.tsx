import { GetColumns, DataType  } from './ArticalsTableUtility';
import React, { useRef, useState } from 'react';
import { Button, InputRef, Space } from 'antd';
import { Table } from 'antd';
import { GetArticles } from '../../services/dataLoader/DataLoader';



const ArticalsTable: React.FC = (props: any) => {

    const [searchText, setSearchText] = useState<string>();
    const [searchedColumn, setSearchedColumn] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DataType[]>(); 


    const searchInput = useRef<InputRef>(null);
    

    const HandleUpdateData = async () => {
        setLoading(true);
        await GetArticles()
        .then(data => {
            setData(data);
            setLoading(false);
        });
        
    }

    const columns = GetColumns(
        searchText,
        searchedColumn,
        searchInput,
        setSearchText,
        setSearchedColumn
    );
    

    return (
        <div>
           
            <Space style={{paddingBottom: 20}}>
                <Button
                 onClick={HandleUpdateData}
                 type="primary" 
                 loading = {loading}
                >
                Load Articals
                </Button>

            <Button type="primary">Parse Articals</Button>
                
            </Space>

            <Table columns={columns} dataSource={data}/>
        </div>
    );
};

export default ArticalsTable;
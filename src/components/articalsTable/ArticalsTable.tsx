import { GetColumns, ArticalTableDataType  } from './ArticalsTableUtility';
import React, { useRef, useState, useEffect } from 'react';
import { Button, InputRef, Space, Popconfirm } from 'antd';
import { Table } from 'antd';
import { GetArticalsTableData, UpdateArticalsData } from '../../services/dataLoader/DataLoader';



const ArticalsTable: React.FC = (props: any) => {

    const [searchText, setSearchText] = useState<string>();
    const [searchedColumn, setSearchedColumn] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ArticalTableDataType[]>(); 


    const searchInput = useRef<InputRef>(null);
    
    useEffect(() => {
        async function fetchData() {
          setData(await GetArticalsTableData());
        }
        fetchData();
    }, []);

    const HandleUpdateData = async () => {
        setLoading(true);
        await UpdateArticalsData()
        .then(async data => {
            setData(await GetArticalsTableData());
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
            <Popconfirm
                title="Are you sure you want to update the list of articles?"
                description="The process of updating the storage will take a long time, we recommend checking the relevance before performing this action"
                okText="Yes"
                cancelText="No"
                onConfirm={HandleUpdateData}
            >
                <Button
                 type="primary" 
                 loading = {loading}
                >
                Update Articals
                </Button>
            </Popconfirm>
                
            </Space>

            <Table columns={columns} dataSource={data}/>
        </div>
    );
};

export default ArticalsTable;
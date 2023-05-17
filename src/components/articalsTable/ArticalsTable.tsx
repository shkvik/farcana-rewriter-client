import { GetColumns, ArticalTableDataType  } from './ArticalsTableUtility';
import React, { useRef, useState, useEffect } from 'react';
import { Button, InputRef, Space, Popconfirm, Steps } from 'antd';
import { Table } from 'antd';
import { GetArticalsTableData, UpdateArticalsData } from '../../services/dataLoader/DataLoader';

interface Info {
    current: number,
    percent: number
}


const ArticalsTable: React.FC = (props: any) => {

    const [searchText, setSearchText] = useState<string>();
    const [searchedColumn, setSearchedColumn] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ArticalTableDataType[]>(); 
    const [parsingProcess, setParsingProcess] = useState<Info>({ current: -1, percent: 0 });
    const [updateConfirm, setUpdateConfirm] = useState<boolean>(false);

    const searchInput = useRef<InputRef>(null);
    
    useEffect(() => {
        async function fetchData() {
          setData(await GetArticalsTableData());
        }
        fetchData();
    }, []);

    const HandleUpdateData = async () => {
        
        setUpdateConfirm(false)
        setLoading(true);

        const newWs = new WebSocket('wss://shkrift.com/process/111');

        newWs.onopen = () => {
            console.log('WebSocket connected');
        };

        newWs.onmessage = (event) => {
            try{
                var response: any = JSON.parse(event.data);
                const tmpInfo: Info = {
                    current: response.step,
                    percent: response.count * 100
                }
                setParsingProcess(tmpInfo);
            }
            catch{
                console.log('Parse error')
            }
            
        };
        newWs.onclose = () => {
            const tmpInfo: Info = {
                current: 3,
                percent: 100
            }
            setParsingProcess(tmpInfo);
            console.log('WebSocket disconnected');
        };

        console.log('ws start')
        await UpdateArticalsData()
        .then(async data => {
            setData(await GetArticalsTableData());
            setLoading(false);
            newWs.close();
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
           <Steps
                style={{ 
                    paddingLeft: 140,
                    paddingRight: 140,
                    paddingBottom: 40,
                    paddingTop: 20
                }}
                
                current={parsingProcess.current}
                percent={parsingProcess.percent}
                items={[
                {
                    title: 'Parsing Links',
                    description: 'Scanning current links with content',
                },
                {
                    title: 'Parsing Content',
                    description: 'Highlighting the main information from sources',
                },
                {
                    title: 'Finish',
                    description: 'Storage updated',
                },
                ]}
            />

            <Space direction="vertical" style={{paddingBottom: 20}}>

                <Popconfirm
                    placement="bottom"
                    title="Are you sure you want to update the list of articles?"
                    description="The process of updating the storage will take a long time, we recommend checking the relevance before performing this action"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={HandleUpdateData}
                    open={updateConfirm}
                >
                    <Button
                        size='large'
                        shape="round"
                        type="primary" 
                        loading = {loading}
                        onClick={() => { setUpdateConfirm(true) }}
                        >
                        Update
                    </Button>
                </Popconfirm>
                
            </Space>

            <Table
                columns={columns}
                dataSource={data}
                style={{ paddingTop: 10 }}
            />
        </div>
    );
};

export default ArticalsTable;
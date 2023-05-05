import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArticalDataType } from '../articalsTable/ArticalsTableUtility';
import { GetArticalDataById } from '../../services/dataLoader/DataLoader';
import { CopyOutlined, EditOutlined } from '@ant-design/icons';

import { Button, Result, Badge, Descriptions,
    Empty, Collapse, Space,  message  } from 'antd';

const { Panel } = Collapse;

const ArticalPage: React.FC = () => {

    const [data, setData] = useState<ArticalDataType>(); 
    const [messageApi, contextHolder] = message.useMessage();

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
          setData(await GetArticalDataById(parseInt(id !== undefined ? id : '-1' )));
        }
        fetchData();
    });

    if(false) {
        return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link to={'/articles'}> Back Home </Link></Button>}
      />
    }

    
    const genExtraArticle = () => (
        <CopyOutlined 
            onClick={(event) => { navigator.clipboard
                .writeText(data?.article !== undefined ? data?.article : '');
                event.stopPropagation();
                messageApi.open({
                    duration: 1,
                    content: <div> <CopyOutlined/> Copy article </div> ,
                });
            }}
        />
    );

    const genExtraRewrited = () => (
        <CopyOutlined 
            onClick={(event) => { 
                if(data?.articalRewrited != undefined){
                    navigator.clipboard.writeText(data?.articalRewrited);
                    
                    messageApi.open({
                        duration: 1,
                        content: <div> <CopyOutlined/> Copy rewrited article </div> ,
                    });
                }
                else{
                    messageApi.open({
                        type: 'error',
                        duration: 1,
                        content: 'First you need to do a rewriting',
                    });
                }
                    
                event.stopPropagation();
                
                
            }}
        />
    );

    const genExtraRewriteBtn = () => (
        <Button 
            type="primary"
            onClick={(event) => { }}
        > Rewrite</Button>
    );
    return (
        <div>
            {contextHolder}
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Descriptions title="Artical Info" layout="vertical" bordered size='middle' extra={genExtraRewriteBtn()}>

                <Descriptions.Item span={3} label="Title">
                    {data?.title}
                </Descriptions.Item>

                <Descriptions.Item span={3} label="Description">
                    {data?.description}
                </Descriptions.Item>

                <Descriptions.Item span={3} label="Author">
                    {data?.author}
                </Descriptions.Item>

                <Descriptions.Item span={3} label="Date">
                    {data?.date}
                </Descriptions.Item>

                {/* <Descriptions.Item label="Status">
                <Badge status="processing" text="Running" />
                </Descriptions.Item> */}


            </Descriptions>
        
            <Collapse>
                <Panel header="Article" key="1" extra={genExtraArticle()}>
                    {data?.article}
                </Panel>
            </Collapse>

            <Collapse>
                <Panel header="Rewrited" key="2" extra={genExtraRewrited()}>
                    {data?.articalRewrited != null ? data?.articalRewrited : <Empty />}
                </Panel>
            </Collapse>
        </Space>
        
        </div>
    );
};

export default ArticalPage;
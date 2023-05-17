import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArticalDataType } from '../articalsTable/ArticalsTableUtility';
import { GetArticalDataById } from '../../services/dataLoader/DataLoader';
import { CopyOutlined } from '@ant-design/icons';


import { RewriteArticalById, GetRewritedArticalById }  from '../../services/dataLoader/DataLoader'

import { Button, Result, Badge, Descriptions, Popconfirm, 
    Empty, Collapse, Space,  message,  } from 'antd';

const { Panel } = Collapse;


interface FrameOpenAI {
    id:  number;
    msg: string;
}

const ArticalPage: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [rewriteConfirm, setRewriteConfirm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ArticalDataType>({
        key:                0,
        title:              "",
        author:             "",
        article:            "",
        date:               "",
        description:        "",
        articalRewrited:    "",
    }); 

    const [messageApi, contextHolder] = message.useMessage();

    const { id } = useParams();

    useEffect(() => {

        async function fetchData() {
          setData(await GetArticalDataById(parseInt(id !== undefined ? id : '-1' )));
        }
        fetchData();
    }, []);

    if(false) {
        return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link to={'/articles'}> Back Home </Link></Button>}
      />
    }

    // const handlePanelLoad = () => {
    //     if (panelRef && panelRef.current) {
    //         const panelElement = panelRef.current as HTMLElement;
    //         panelElement.scrollIntoView({ behavior: "smooth" });
    //       }
    // };
    
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
    

    const RewriteCurrentArticle = async () => {
        
        setRewriteConfirm(false)
        setLoading(true);

        const newWs = new WebSocket('ws://185.29.184.162:8030/rewrite');
        
        data.articalRewrited = '';

        newWs.onopen = () => {
            console.log('WebSocket connected');
        };

        newWs.onmessage = (event) => {
            try {
                var response: any = JSON.parse(event.data);

                const tmpFrame: FrameOpenAI = {
                    id: response.id,
                    msg: response.msg
                }

                var frame = tmpFrame.msg != null || 'null' ? tmpFrame.msg : '';

                setData((prevState) => (
                    {...prevState, 
                        articalRewrited: prevState.articalRewrited + frame}));

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth"
                });
                //console.log('Received message:', JSON.parse(event.data));
            }
            catch{

            }
            
        };
        newWs.onclose = () => {
            setLoading(false);
            console.log('WebSocket disconnected');
        };

        setWebSocket(newWs);
        console.log('ws start')
        await RewriteArticalById(data.key)
        .then(async dataComplite => {
            var article = await GetRewritedArticalById(data.key);
            setData((prevState) => ({...prevState, articalRewrited: article}));
            setLoading(false);
        });
        
    }




    const genExtraRewriteBtn = () => (
        <Popconfirm
            title="Rewrite this article?"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={RewriteCurrentArticle}
            open={rewriteConfirm}
            placement="bottom"
        >
            <Button 
                type="primary"
                onClick={() => {setRewriteConfirm(true)}}
                loading = {loading}
            > Rewrite</Button>
        </Popconfirm>
        
    );
    return (
        <div style={{
            paddingLeft: 200,
            paddingRight: 200
        }}>
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

            </Descriptions>
        
            <Collapse>
                <Panel header="Article" key="1" extra={genExtraArticle()}>
                    {data?.article}
                </Panel>
            </Collapse>

            <div ref={inputRef} >
                <Collapse
                    
                >
                    <Panel 
                        header="Rewrited" 
                        key="2" 
                        extra={genExtraRewrited()}
                    >
                        {data?.articalRewrited != null ? data?.articalRewrited : <Empty />}
                    </Panel>

                </Collapse>
            </div>
            
        </Space>
        
        </div>
    );
};

export default ArticalPage;
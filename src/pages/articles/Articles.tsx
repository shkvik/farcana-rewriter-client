import React from 'react';
import { Button, Space } from 'antd';
import ArticalsTable from '../../components/articalsTable/ArticalsTable';


const Articles: React.FC = () => {

    return (
        <div style={{textAlign: 'center'}}>

            <Space style={{paddingBottom: 20}}>
                <Button type="primary">Load Articals</Button>
                <Button type="primary">Parse Articals</Button>
            </Space>

            <ArticalsTable/>

        </div>
    );
};

export default Articles;
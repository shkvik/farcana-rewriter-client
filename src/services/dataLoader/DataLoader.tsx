import { DataType } from "../../components/articalsTable/ArticalsTableUtility";
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

const DEBUG: boolean = true;

interface DataApiResponse {
    id:              number;
    title:           string;
    description:     string;
    author:          string;
    article:         string;
    articalRewrited: string;
    date:            string;
}

const ApiDomen = 'https://localhost:7054';

function ConvertToDataType(data: DataApiResponse[]): DataType[] {
    return data.map((article, index) => {
        var str: string = `/articles/${article.id}`;
        var tmpArticle: DataType = 
        {
            key:         article.id,
            title:       article.title,
            author:      article.author,
            date:        article.date,
            description: article.description,
            action:      <Link to={ `/articles/${article.id}`}> Show </Link>,
        };
        return tmpArticle;
    });
}


export async function GetArticles(): Promise<DataType[]> {

    const request = new Request(`${ApiDomen}/api/Polygon/GetArticalsTableData`, { method: 'GET' });
    const timeoutPromise = new Promise<Response>((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout exceeded'));
        }, 40000); // 40 секунд в миллисекундах
    });
    try {

        const response = await Promise.race([fetch(request), timeoutPromise]);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if(DEBUG) { 
            console.log(ConvertToDataType(data));
        }

        return ConvertToDataType(data);
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}
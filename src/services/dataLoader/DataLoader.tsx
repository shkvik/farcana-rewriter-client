import { ArticalTableDataType, ArticalDataType } from "../../components/articalsTable/ArticalsTableUtility";
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

function ConvertToArticalTableDataType(data: DataApiResponse[]): ArticalTableDataType[] {
    return data.map((article, index) => {
        var str: string = `/articles/${article.id}`;
        var tmpArticle: ArticalTableDataType = 
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


function ConvertToArticalDataType(data: DataApiResponse): ArticalDataType {
    var tmpArticle: ArticalDataType = 
    {
        key:     data.id,
        title:   data.title,
        author:  data.author,
        date:    data.date,
        article: data.article,
        description: data.description,
        articalRewrited: data.articalRewrited
    };
    return tmpArticle;
}

export async function UpdateArticalsData(): Promise<boolean> {

    const request = new Request(`${ApiDomen}/api/Polygon/UpdateArticalsData`, { method: 'GET' });
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
            console.log(data);
        }
        return data;
        // return ConvertToDataType(data);
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return false;
    }
}

export async function GetArticalsTableData(): Promise<ArticalTableDataType[]> {

    const response = await fetch(`${ApiDomen}/api/Polygon/GetArticalsTableData`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if(DEBUG) { 
        console.log(data);
    }

    return ConvertToArticalTableDataType(data);
}



export async function GetArticalDataById(index: number): Promise<ArticalDataType> {

    const response = await fetch(`${ApiDomen}/api/Polygon/GetArtical/${index}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: DataApiResponse = await response.json();

    if(DEBUG) { 
        console.log(data);
    }

    return ConvertToArticalDataType(data);
}
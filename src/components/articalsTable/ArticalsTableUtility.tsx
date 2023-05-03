import React  from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space} from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';


export interface DataType {
    key:    number;
    title:  string;
    author: string;
    date:   string;
    description: string;
}

export type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        key: 1,
        title: 'John Brown',
        author: "w",
        date: "12.32.2",
        description: 'New York No. 1 Lake Park',
    },
    {
        key: 2,
        title: 'John Brown',
        author: "w",
        date: "12.32.2",
        description: 'New York No. 1 Lake Park',
    },
    {
        key: 3,
        title: 'John Brown',
        author: "w",
        date: "12.32.2",
        description: 'New York No. 1 Lake Park',
    },
  ];

const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
    callbackSetSearchText:     (value: React.SetStateAction<string>) => void,
    callbackSetSearchedColumn: (value: React.SetStateAction<string>) => void
) => {
    confirm();
    callbackSetSearchText(selectedKeys[0]);
    callbackSetSearchedColumn(dataIndex);
};

const handleReset = (
    clearFilters: () => void,
    callbackSetSearchText: (value: React.SetStateAction<string>) => void,
) => {
    clearFilters();
    callbackSetSearchText('');
};

const getColumnSearchProps = (
    dataIndex:      DataIndex,
    searchInput:    React.RefObject<InputRef>,
    searchText:     string,
    searchedColumn: string,
    callbackSetSearchText:      (value: React.SetStateAction<string>) => void,
    callbackSetSearchedColumn:  (value: React.SetStateAction<string>) => void

    ): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(
            selectedKeys as string[], 
            confirm, 
            dataIndex, 
            callbackSetSearchText, 
            callbackSetSearchedColumn
          )}

          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(
                selectedKeys as string[], 
                confirm, 
                dataIndex,
                callbackSetSearchText, 
                callbackSetSearchedColumn
            )}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(
                clearFilters,
                callbackSetSearchText
            )}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              callbackSetSearchText((selectedKeys as string[])[0]);
              callbackSetSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });




    

 export function GetColumns(
    searchText:     string,
    searchedColumn: string,
    searchInput:    React.RefObject<InputRef>,
    callbackSetSearchText:      (value: React.SetStateAction<string>) => void,
    callbackSetSearchedColumn:  (value: React.SetStateAction<string>) => void
 ): ColumnsType<DataType> {

const columns: ColumnsType<DataType> =  
    [
        {
            title: 'Id',
            dataIndex: 'key',
            key: 'key',
            ...getColumnSearchProps(
                'key',
                searchInput,    
                searchText,     
                searchedColumn, 
                callbackSetSearchText,      
                callbackSetSearchedColumn
            ),

            sorter: (a, b) => a.key - b.key,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps(
                'title',
                searchInput,    
                searchText,     
                searchedColumn, 
                callbackSetSearchText,      
                callbackSetSearchedColumn
            ),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            ...getColumnSearchProps(
                'author',
                searchInput,    
                searchText,     
                searchedColumn, 
                callbackSetSearchText,      
                callbackSetSearchedColumn
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps(
                'date',
                searchInput,    
                searchText,     
                searchedColumn, 
                callbackSetSearchText,      
                callbackSetSearchedColumn
            ),
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ...getColumnSearchProps(
            'description',
            searchInput,    
            searchText,     
            searchedColumn, 
            callbackSetSearchText,      
            callbackSetSearchedColumn
        ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    return columns;
 }
 
 


export function GetData(): DataType[] {
    return data;
};
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import useSortableData from '../common/SortableData';

import data from '../data.json'

function Dashboard() {
    const [jsonData, setJsonData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        setJsonData(data)
        setSortedData(data)
    },[])

    const handleSearch = (e) => {
        let value = e.target.value;
        let data = jsonData.filter(item=> (
            item.first_name.toLowerCase().indexOf(value.toLowerCase())!== -1 || item.last_name.toLowerCase().indexOf(value.toLowerCase())!== -1 || item.country.toLowerCase().indexOf(value.toLowerCase())!== -1
        ))
        setSearchText(value)
        setSortedData(data)
    }

    const CreateTable = (props) => {
        const { sortedItems, requestSort, sortConfig } = useSortableData(props.data);
        const getClassNamesFor = (name) => {
            if (!sortConfig) {
            return;
            }
            return sortConfig.key === name ? sortConfig.direction : undefined;
        };
        return (
            <table className='table table-hover'>
                    <thead className="thead-dark">
                        <tr>
                            <th>
                                <button type="button" onClick={() => requestSort('id')} className={getClassNamesFor('id')}>
                                    #
                                </button>
                            </th>
                            <th>
                                <button type="button" onClick={() => requestSort('first_name')} className={getClassNamesFor('first_name')}>
                                    First Name
                                </button>
                            </th>
                            <th>
                                <button type="button" onClick={() => requestSort('last_name')} className={getClassNamesFor('last_name')}>
                                    Last Name
                                </button>
                            </th>
                            <th>
                                <button type="button" onClick={() => requestSort('email')} className={getClassNamesFor('email')}>
                                    Email
                                </button>
                            </th>
                            <th>
                                <button type="button" onClick={() => requestSort('birth_year')} className={getClassNamesFor('birth_year')}>
                                    Birth Year 
                                </button>
                            </th>
                            <th>
                                <button type="button" onClick={() => requestSort('country')} className={getClassNamesFor('country')}>
                                    Country
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedItems && sortedItems.length > 0 &&
                            sortedItems.map((row)=>(
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.first_name}</td>
                                    <td>{row.last_name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.birth_year}</td>
                                    <td>{row.country}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        )
    }

    return (
        <div className="col-md-8 m-auto table-responsive">
            <div className="card card-body mt-5">
                <h2 className="text-center">Dashboard</h2>
                <input
                    style={{marginBottom:'1%'}}
                    className="form-control"
                    name="search"
                    placeholder="Search for First, Last or Country Name..."
                    onChange={handleSearch}
                    value={searchText}
                />
                <CreateTable data={sortedData}/>
            </div>
        </div>
    )
}

export default Dashboard

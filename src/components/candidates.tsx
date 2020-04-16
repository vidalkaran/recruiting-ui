import React, { useState, useEffect }from 'react';
import MaterialTable from 'material-table';
import config from '../config';
import { Candidate } from '../entities/candidate';
function setState(state: any) { state = state;
}
export default function Candidates() {

const [page ] = useState(1);
const [candidates, setCandidates] = useState([]);

useEffect(() => { 
    fetch(
     `${config.apiRoot}/candidates`,
     {
       method: "GET",
       headers: new Headers({
         ContentType: "application/json; charset=utf-8",
         Accept: "application/json; charset=utf-8"
       })
    })
    .then(res => res.json()) .then(response => {
       setCandidates(response.data.candidates);
     })
    .catch(error => console.log(error)); }, [page]);
 
return (
    <MaterialTable
      title=""
      columns={[
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        ]}
      data={candidates}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              fetch(
                `${config.apiRoot}/candidates`,
                {
                  method: "PUT",
                  headers: new Headers({
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json; charset=utf-8"
                  }),
                  body: JSON.stringify(
                    newData
                  ),
                }
              )
              .then(res => res.json())
              .then(response => {
                  console.log(response);
                  setCandidates(response.data.candidates);
              })
              .catch(error => console.log(error));
              resolve();
              setState((prevState: { data: any; }) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData:any, oldData:any) =>
          new Promise((resolve) => {
            setTimeout(() => {
              fetch(
                `${config.apiRoot}/candidates/${newData.id}`,
                {
                  method: "PATCH",
                  headers: new Headers({
                    ContentType: "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8"
                  }),
                  body: JSON.stringify(
                    newData
                  ),
                }
              )
              .then(res => res.json())
              .then(response => {
                  setCandidates(response.data.candidates);
              })
              .catch(error => console.log(error));
              resolve();
              if (oldData) {
                setState((prevState: { data: any; }) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData:Candidate) =>
          new Promise((resolve) => {
            setTimeout(() => {
              fetch(
                `${config.apiRoot}/candidates/${oldData.id}`,
                {
                  method: "DELETE",
                  headers: new Headers({
                    ContentType: "application/json; charset=utf-8",
                    Accept: "application/json; charset=utf-8"
                  })
                }
              )
              .then(res => res.json())
              .then(response => {
                setCandidates(response.data.candidates);
              })
              .catch(error => console.log(error));
              resolve();
              setState((prevState: { data: any; }) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}      
    />
  );

}
 
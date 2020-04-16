import React, { useState, useEffect }from 'react';
import MaterialTable from 'material-table';
import config from '../config';
import { Position } from '../entities/position';
function setState(state: any) { state = state;
}
export default function Positions() {
const [page ] = useState(1);
const [positions, setPositions] = useState([]);
useEffect(() => { 
    fetch(
     `${config.apiRoot}/positions`,
     {
       method: "GET",
       headers: new Headers({
         ContentType: "application/json; charset=utf-8",
         Accept: "application/json; charset=utf-8"
       })
} )
.then(res => res.json()) .then(response => {
       setPositions(response.data.positions);
     })
.catch(error => console.log(error)); }, [page]);

 return (
   <MaterialTable
     title=""
     columns={[
       { title: 'Title', field: 'title' },
       { title: 'Level', field: 'level' },
       ]}
     data={positions}
     editable={{
      onRowAdd: (newData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            fetch(
              `${config.apiRoot}/positions`,
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
                setPositions(response.data.positions);
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
              `${config.apiRoot}/positions/${newData.id}`,
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
                setPositions(response.data.positions);
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
      onRowDelete: (oldData:Position) =>
        new Promise((resolve) => {
          setTimeout(() => {
            fetch(
              `${config.apiRoot}/positions/${oldData.id}`,
              {
                method: "DELETE",
                headers: new Headers({
                  "Content-Type": "application/json; charset=utf-8",
                  Accept: "application/json; charset=utf-8"
                })
              }
            )
            .then(res => res.json())
            .then(response => {
                setPositions(response.data.positions);
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
 
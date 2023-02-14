import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { parse } from 'json2csv';
import { saveAs } from 'file-saver';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin-top: 20px;
  text-align: center;
`;


const Th = styled.th`
  background-color: #3f51b5;
  color: white;
  padding: 10px;
`;

const Td = styled.td`
  border: 1px solid white;
  padding: 10px;
  background-color: #e1e1e1;
`;

const Image = styled.img`
  border-radius: 50%;
  background-color: white;
  width: 50px;
  height: 50px;
`;

          



function sortUsersByAge(users) {
  return users.sort((a, b) => a.dob.age - b.dob.age);
}

function downloadCSV(data) {
  const fields = [
    { label: 'Nombre', value: 'name.first' },
    { label: 'Apellido', value: 'name.last' },
    { label: 'Edad', value: 'dob.age' },
    { label: 'Género', value: 'gender' },
    { label: 'Email', value: 'email' },
    { label: 'Nacionalidad', value: 'nat' },
  ];

  const csv = parse(data, { fields });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'data.csv');
}

function ClientsTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/', {
        params: {
          results: 15,
          
        },
      })
      .then((response) => {
        setData(sortUsersByAge(response.data.results));
      });
  }, []);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Edad</Th>
            <Th>Género</Th>
            <Th>Email</Th>
            <Th>Nacionalidad</Th>
            <Th>Foto</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.email}>
              <Td>{user.name.first}</Td>
              <Td>{user.name.last}</Td>
              <Td>{user.dob.age}</Td>
              <Td>{user.gender}</Td>
              <Td>{user.email}</Td>
              <Td>{user.nat}</Td>
              <Td>
                <Image src={user.picture.thumbnail} alt={user.name.first} />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
       <button onClick={() => downloadCSV(data)}>Descargar CSV</button>
      </Container>
      
  );
}


function App() {
  return (
    <div className="App">
    <ClientsTable/>
    </div>
  );
}

export default App;

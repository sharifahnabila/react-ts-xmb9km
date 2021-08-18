import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import './style.css';

ReactHTMLTableToExcel.format = (s, c) => {
  if (c && c['table']) {
    const html = c.table;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('tr');


    c.table = doc.querySelector('table').outerHTML;
  }

  return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};

function App() {
  const data = [
    {
      timeIn: "9:00",
      timeOut: "6:00",
      name: "David",
      Job: "Electrician",
      temperature: 30.1
    },
    {
      timeIn: "9:00",
      timeOut: "6:00",
      name: "Ali",
      Job: "Electrician",
      temperature: 30.4
    },
    {
      timeIn: "9:00",
      timeOut: "6:00",
      name: "Kumar",
      Job: "Electrician",
      temperature: 30.6
    }
  ];

  return (
    <div className="App">
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="Worker Attendance"
        sheet="tablexls"
        buttonText="Export"
      />
      <table id="table-to-xls">
        <thead>
          <tr>
          <th>Time In</th>
            <th>Time Out</th>
            <th>Name</th>
            <th>Job</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`tr-${index}`}>
              <td>{item.timeIn}</td>
              <td>{item.timeOut}</td>
              <td>{item.name}</td>
              <td>{item.Job}</td>
              <td>{item.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

render(<App />, document.getElementById('root'));

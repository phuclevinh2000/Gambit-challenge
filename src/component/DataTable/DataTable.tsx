import React from 'react';
import './DataTable.scss';
import { convertDataModbus } from '../../utils/utils';

const DataTable = ({ registerTable }: any) => {
  if (!registerTable) {
    return <></>;
  }
  return (
    <table className='content-table'>
      <thead>
        <tr>
          <th>Register</th>
          <th>Variable Name</th>
          <th>Format</th>
          <th>Note</th>
          <th>Raw Data</th>
          <th>Converted Data</th>
        </tr>
      </thead>
      <tbody>
        {registerTable.map((data: any) => {
          let dataConvertInput = null;
          if (data.name === '') {
            dataConvertInput = [data.name, data.format, data.id];
          } else if (
            registerTable[data.id]?.name === data.name &&
            data.name !== ''
          ) {
            dataConvertInput = [
              data.name,
              data.format,
              data.rawData,
              registerTable[data.id]?.rawData,
            ];
            // console.log(data.id, registerTable[data.id].id);
          } else if (
            registerTable[data.id - 2]?.name !== data.name &&
            registerTable[data.id]?.name !== data.name &&
            data.name !== ''
          ) {
            dataConvertInput = [data.name, data.format, data.rawData];
            // console.log(data.id);
          }

          const convertedData = convertDataModbus(dataConvertInput);
          // console.log(convertedData);

          return (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.format}</td>
              <td>{data.Note}</td>
              <td>{data.rawData}</td>
              {<td>{convertedData}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;

import './DataTable.scss';
import { convertDataModbus } from '../../utils/utils';
import { tableDataType } from '../../types';

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
        {registerTable.map((data: tableDataType) => {
          let dataConvertInput = null;
          // If there is no name
          if (data.name === '') {
            dataConvertInput = [data.name, data.format, data.id];

            // If only current one and the next one is equal
          } else if (
            registerTable[data.id]?.name === data.name &&
            data.name !== '' &&
            data.name !== registerTable[data.id + 1]?.name &&
            registerTable[data.id - 2]?.name !== data.name
          ) {
            dataConvertInput = [
              data.name,
              data.format,
              data.rawData,
              registerTable[data.id]?.rawData,
            ];
            // If only current one is the unique
          } else if (
            registerTable[data.id - 2]?.name !== data.name &&
            registerTable[data.id]?.name !== data.name &&
            data.name !== ''
          ) {
            dataConvertInput = [data.name, data.format, data.rawData];

            // If there are 3 element with the same name
          } else if (
            registerTable[data.id]?.name === data.name &&
            data.name !== '' &&
            data.name === registerTable[data.id + 1]?.name &&
            registerTable[data.id - 2]?.name !== data.name
          ) {
            dataConvertInput = [
              data.name,
              data.format,
              data.rawData,
              registerTable[data.id]?.rawData,
            ];
            dataConvertInput = [
              data.name,
              data.format,
              data.rawData,
              registerTable[data.id]?.rawData,
              registerTable[data.id + 1].rawData,
            ];
          }

          const convertedData = convertDataModbus(dataConvertInput);

          return (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.format}</td>
              <td>{data.Note}</td>
              <td>{data.rawData}</td>
              <td>{convertedData}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;

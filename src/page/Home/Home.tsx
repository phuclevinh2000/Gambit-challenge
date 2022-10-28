import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.scss';
import { ClockLoader } from 'react-spinners';
import { modbusDataType } from '../../types';
import { registerNameData } from '../../data/RegisterName';
import { mergedArrayById } from '../../utils/utils';
import DataTable from '../../component/DataTable/DataTable';

const baseURL = './modbus-sample.txt';

const Home = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [registerTable, setRegisterTable] = useState<modbusDataType[]>();
  const [dataSentTime, setDataSentTime] = useState('');

  // Format the data
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const splitResponseToArray = response.data.split('\n'); // Split the response by lines
      const fullyFormattedServerArray: modbusDataType[] = [];
      setDataSentTime(splitResponseToArray[0]); // Set the first parameter to be time
      splitResponseToArray.shift(); //remove the first date time parameter
      const formatData = splitResponseToArray.map((item: string) => {
        const indexOfBack = item.indexOf('\r');
        const sortValue = item.slice(0, indexOfBack); //Remove the "/r" at the back of each element in the array
        return sortValue;
      });
      formatData.forEach((item: string) => {
        const singleDataObject = {
          id: Number(item.split(':')[0]),
          rawData: Number(item.split(':')[1]),
        };

        fullyFormattedServerArray.push(singleDataObject);
      });

      // Set the full array of object
      setRegisterTable(
        mergedArrayById(fullyFormattedServerArray, registerNameData)
      );
    });
  }, []);

  if (!user) {
    navigate('/login');
  } else if (!registerTable) {
    <ClockLoader color='#rgba(0, 0, 0, 0.8)' />;
  }
  return (
    <div className='home'>
      <p className='home-title'>TUF-2000M</p>
      <p className='home-dateTime'>{dataSentTime}</p>
      <DataTable registerTable={registerTable} />
    </div>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClockLoader } from 'react-spinners';
import { modbusDataType } from '../../types';

const baseURL = './modbus-sample.txt';

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerTable, setRegisterTable] = useState<modbusDataType[]>();
  const [dataSentTime, setDataSentTime] = useState('');

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const splitResponseToArray = response.data.split('\n'); // Split the response by lines
      const fullyFormattedArray: modbusDataType[] = [];
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

        fullyFormattedArray.push(singleDataObject);
      });

      setRegisterTable(fullyFormattedArray);
    });
  }, []);

  console.log(registerTable);

  if (!user) {
    navigate('/login');
  } else if (!registerTable) {
    <ClockLoader color='#rgba(0, 0, 0, 0.8)' />;
  }
  return (
    <div className='home'>
      <button onClick={() => dispatch(logout())}>Log out</button>
    </div>
  );
};

export default Home;

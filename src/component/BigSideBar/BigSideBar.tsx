import sidebarData from '../../data/sideBarData';

const BigSideBar = () => {
  return (
    <div className='modbus-big-sidebar'>
      {sidebarData.map((item) => (
        <p>{item.title}</p>
      ))}
    </div>
  );
};

export default BigSideBar;

/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import WazirxTransactions from '../../components/wazirx/WazirxTransactions';
import WazirxAddTransaction from '../../components/wazirx/WazirxAddTransaction';
import WazirxCoinList from '../../components/wazirx/tradingMenu/WazirxCoinList';
import TradingMenu from '../../components/wazirx/tradingMenu/TradingMenu';

function TabPanel(props) {
  const {children, value, index, ...other} = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

const WazirxDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{overflowX: 'auto'}}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Market" />
        <Tab label="Buy/Sell" />
        <Tab label="Transactions" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TradingMenu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WazirxAddTransaction />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WazirxTransactions />
      </TabPanel>
    </div>
  );
};

export default WazirxDashboard;

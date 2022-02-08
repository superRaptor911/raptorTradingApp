import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TradingMenu from '../../components/wazirx/tradingMenu/TradingMenu';
import useDeviceType from '../../components/hooks/useDeviceType';
import TradingMenuMobile from '../../components/wazirx/tradingMenuMobile/TradingMenu';
import WazirxTransactions from '../../components/wazirx/tradingMenu/WazirxTransactions';

function TabPanel(props: any) {
  const {children, value, index, ...other} = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

const WazirxDashboard = () => {
  const [value, setValue] = useState(0);
  const isMobile = 'mobile' === useDeviceType();

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  if (isMobile) {
    return (
      <div>
        <TradingMenuMobile />
      </div>
    );
  }

  return (
    <div style={{overflowX: 'auto'}}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Market" />
        <Tab label="Transactions" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TradingMenu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WazirxTransactions />
      </TabPanel>
    </div>
  );
};

export default WazirxDashboard;

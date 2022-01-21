import React from 'react';
import Box from '@mui/material/Box';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BottomNavigation from '@mui/material/BottomNavigation';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TradingCoinListMobile from './TradingCoinListMobile';
import {useTradingStore} from './uiStore';
import WazirxTransactionsMobile from './WazirxTransactionsMobile';

const TradingMenuMobile = () => {
  const selectedTab = useTradingStore(state => state.selectedTab);
  const setSelectedTab = useTradingStore(state => state.setSelectedTab);

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <BottomNavigation
        style={{width: '100%'}}
        showLabels
        value={selectedTab}
        onChange={(_event, newValue) => {
          setSelectedTab(newValue);
        }}>
        <BottomNavigationAction label="Coins" icon={<MonetizationOnIcon />} />
        <BottomNavigationAction
          label="Transactions"
          icon={<ReceiptLongIcon />}
        />
        <BottomNavigationAction
          label="Wallet"
          icon={<AccountBalanceWalletIcon />}
        />
      </BottomNavigation>
      {selectedTab == 0 && <TradingCoinListMobile />}
      {selectedTab == 1 && <WazirxTransactionsMobile />}
    </Box>
  );
};

export default TradingMenuMobile;

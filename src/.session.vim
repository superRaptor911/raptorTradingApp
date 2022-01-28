let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/program/react/vite/raptorTradingApp/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
edit ~/program/react/vite/raptorTradingApp/src/store.ts
argglobal
balt components/wazirx/tradingMenuMobile/TradingCoinListMobile.jsx
let s:l = 79 - ((41 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 79
normal! 0
tabnext 1
badd +68 types.ts
badd +1 components/UserList.jsx
badd +64 components/CoinList.jsx
badd +30 api/api.js
badd +6 api/wazirxApi.js
badd +37 pages/AddTransations.jsx
badd +5 pages/wazirx/WazirxTradingMenuMobile.tsx
badd +32 pages/AddCoin.tsx
badd +3 pages/wazirx/Automation.tsx
badd +23 pages/wazirx/StopLossBot.tsx
badd +26 components/helper.js
badd +85 components/wazirx/stopLossBot/RulesMenu.jsx
badd +62 components/user/UserTransactions.jsx
badd +62 components/wazirx/stopLossBot/RuleItem.jsx
badd +2 components/wazirx/tradingMenu/MarketGraph.jsx
badd +120 pages/Coin.jsx
badd +67 components/wazirx/tradingMenuMobile/WazirxTransactionsMobile.jsx
badd +82 components/wazirx/tradingMenu/Transactions.jsx
badd +19 components/wazirx/tradingMenu/TradingMenu.jsx
badd +72 components/wazirx/tradingMenuMobile/PlaceOrder.jsx
badd +13 components/wazirx/tradingMenuMobile/uiStore.js
badd +46 components/wazirx/tradingMenu/Wallet.jsx
badd +23 components/wazirx/WazirxAddTransaction.jsx
badd +47 components/summary/TotalInvestmentAndProfit.jsx
badd +30 pages/wazirx/WazirxDashboard.jsx
badd +1 components/user/UserFUndTransfers.jsx
badd +60 components/header/DrawerMenu.jsx
badd +46 components/wazirx/tradingMenu/WazirxCoinList.jsx
badd +34 components/Header.jsx
badd +1 routes.ts
badd +69 components/wazirx/WazirxTransactions.jsx
badd +3 components/hooks/useTimer.js
badd +1 pages/AddUser.jsx
badd +69 components/summary/TotalCoins.jsx
badd +8 pages/Summary.jsx
badd +4 pages/User.jsx
badd +48 App.jsx
badd +1 api/request.js
badd +9 pages/Home.jsx
badd +23 utility.ts
badd +89 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +31 pages/FundTransfer.jsx
badd +34 pages/AdminMenu.jsx
badd +18 pages/AdminLogin.jsx
badd +26 pages/Transactions.jsx
badd +25 components/user/UserStats.jsx
badd +11 components/TablePaginationAction.jsx
badd +52 pages/UserLogin.jsx
badd +41 components/wazirx/tradingMenuMobile/TradingMenu.jsx
badd +44 components/wazirx/tradingMenuMobile/TradingCoinListMobile.jsx
badd +0 ~/program/react/vite/raptorTradingApp/src/store.ts
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :

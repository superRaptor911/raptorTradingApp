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
edit pages/wazirx/WazirxTradingMenuMobile.jsx
argglobal
balt components/wazirx/tradingMenuMobile/PlaceOrder.jsx
let s:l = 99 - ((22 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 99
normal! 019|
tabnext 1
badd +60 components/wazirx/tradingMenuMobile/PlaceOrder.jsx
badd +12 components/wazirx/tradingMenuMobile/uiStore.js
badd +1 components/wazirx/tradingMenu/MarketGraph.jsx
badd +46 components/wazirx/tradingMenu/Wallet.jsx
badd +140 components/wazirx/WazirxAddTransaction.jsx
badd +70 components/summary/TotalInvestmentAndProfit.jsx
badd +54 api/wazirxApi.js
badd +30 pages/wazirx/WazirxDashboard.jsx
badd +20 components/wazirx/tradingMenu/TradingMenu.jsx
badd +1 components/user/UserFUndTransfers.jsx
badd +59 components/user/UserTransactions.jsx
badd +70 components/UserList.jsx
badd +52 components/header/DrawerMenu.jsx
badd +42 components/wazirx/tradingMenu/WazirxCoinList.jsx
badd +112 components/Header.jsx
badd +14 routes.js
badd +46 components/wazirx/tradingMenu/Transactions.jsx
badd +1 components/wazirx/WazirxTransactions.jsx
badd +46 api/api.js
badd +3 components/hooks/useTimer.js
badd +16 pages/AddUser.jsx
badd +19 components/summary/TotalCoins.jsx
badd +9 pages/Summary.jsx
badd +77 pages/User.jsx
badd +49 App.jsx
badd +1 store.js
badd +96 components/CoinList.jsx
badd +20 api/request.js
badd +9 pages/Home.jsx
badd +19 utility.js
badd +1 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +1 pages/AddTransations.jsx
badd +31 pages/FundTransfer.jsx
badd +18 pages/AdminMenu.jsx
badd +18 pages/AdminLogin.jsx
badd +111 pages/Transactions.jsx
badd +14 components/user/UserStats.jsx
badd +11 components/TablePaginationAction.jsx
badd +52 pages/UserLogin.jsx
badd +24 components/wazirx/tradingMenuMobile/TradingMenu.jsx
badd +36 components/wazirx/tradingMenuMobile/TradingCoinListMobile.jsx
badd +99 pages/wazirx/WazirxTradingMenuMobile.jsx
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

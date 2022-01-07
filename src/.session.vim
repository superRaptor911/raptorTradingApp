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
edit components/UserList.jsx
argglobal
balt components/header/DrawerMenu.jsx
let s:l = 84 - ((15 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 84
normal! 0
tabnext 1
badd +1 components/header/DrawerMenu.jsx
badd +58 components/wazirx/tradingMenu/WazirxCoinList.jsx
badd +12 components/wazirx/tradingMenu/MarketGraph.jsx
badd +10 components/wazirx/tradingMenu/TradingMenu.jsx
badd +68 components/wazirx/WazirxAddTransaction.jsx
badd +68 components/Header.jsx
badd +5 routes.js
badd +46 components/wazirx/tradingMenu/Transactions.jsx
badd +1 components/wazirx/WazirxTransactions.jsx
badd +53 api/wazirxApi.js
badd +4 api/api.js
badd +3 components/hooks/useTimer.js
badd +16 pages/AddUser.jsx
badd +70 components/summary/TotalCoins.jsx
badd +9 pages/Summary.jsx
badd +2 components/UserList.jsx
badd +51 components/user/UserTransactions.jsx
badd +79 pages/User.jsx
badd +34 App.jsx
badd +44 store.js
badd +86 components/CoinList.jsx
badd +20 api/request.js
badd +14 pages/Home.jsx
badd +53 components/summary/TotalInvestmentAndProfit.jsx
badd +5 utility.js
badd +10 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +1 pages/AddTransations.jsx
badd +31 pages/FundTransfer.jsx
badd +18 pages/AdminMenu.jsx
badd +18 pages/AdminLogin.jsx
badd +111 pages/Transactions.jsx
badd +93 components/user/UserStats.jsx
badd +106 components/user/UserFUndTransfers.jsx
badd +11 components/TablePaginationAction.jsx
badd +33 pages/wazirx/WazirxDashboard.jsx
badd +1 pages/UserLogin.jsx
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

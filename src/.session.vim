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
edit components/wazirx/stopLossBot/RulesMenu.jsx
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '2resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 2resize ' . ((&columns * 1 + 87) / 174)
exe '3resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 3resize ' . ((&columns * 50 + 87) / 174)
argglobal
balt api/wazirxApi.js
let s:l = 26 - ((21 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 26
normal! 011|
wincmd w
argglobal
enew
balt components/wazirx/stopLossBot/RulesMenu.jsx
wincmd w
argglobal
enew
balt components/wazirx/stopLossBot/RulesMenu.jsx
wincmd w
exe '2resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 2resize ' . ((&columns * 1 + 87) / 174)
exe '3resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 3resize ' . ((&columns * 50 + 87) / 174)
tabnext 1
badd +7 pages/wazirx/StopLossBot.jsx
badd +2 components/wazirx/tradingMenu/MarketGraph.jsx
badd +88 components/CoinList.jsx
badd +120 pages/Coin.jsx
badd +33 components/UserList.jsx
badd +47 components/wazirx/tradingMenuMobile/WazirxTransactionsMobile.jsx
badd +82 components/wazirx/tradingMenu/Transactions.jsx
badd +20 components/wazirx/tradingMenu/TradingMenu.jsx
badd +38 api/api.js
badd +59 components/wazirx/tradingMenuMobile/PlaceOrder.jsx
badd +13 components/wazirx/tradingMenuMobile/uiStore.js
badd +46 components/wazirx/tradingMenu/Wallet.jsx
badd +120 components/wazirx/WazirxAddTransaction.jsx
badd +47 components/summary/TotalInvestmentAndProfit.jsx
badd +60 api/wazirxApi.js
badd +42 pages/wazirx/WazirxDashboard.jsx
badd +1 components/user/UserFUndTransfers.jsx
badd +121 components/user/UserTransactions.jsx
badd +52 components/header/DrawerMenu.jsx
badd +46 components/wazirx/tradingMenu/WazirxCoinList.jsx
badd +34 components/Header.jsx
badd +18 routes.js
badd +69 components/wazirx/WazirxTransactions.jsx
badd +3 components/hooks/useTimer.js
badd +1 pages/AddUser.jsx
badd +69 components/summary/TotalCoins.jsx
badd +8 pages/Summary.jsx
badd +4 pages/User.jsx
badd +48 App.jsx
badd +43 store.js
badd +20 api/request.js
badd +9 pages/Home.jsx
badd +22 utility.js
badd +136 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +3 pages/AddTransations.jsx
badd +31 pages/FundTransfer.jsx
badd +34 pages/AdminMenu.jsx
badd +18 pages/AdminLogin.jsx
badd +18 pages/Transactions.jsx
badd +25 components/user/UserStats.jsx
badd +11 components/TablePaginationAction.jsx
badd +52 pages/UserLogin.jsx
badd +25 components/wazirx/tradingMenuMobile/TradingMenu.jsx
badd +37 components/wazirx/tradingMenuMobile/TradingCoinListMobile.jsx
badd +143 pages/wazirx/WazirxTradingMenuMobile.jsx
badd +6 pages/AddCoin.jsx
badd +17 components/helper.js
badd +3 pages/wazirx/Automation.jsx
badd +26 components/wazirx/stopLossBot/RulesMenu.jsx
badd +41 components/wazirx/stopLossBot/RuleItem.jsx
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFc
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :

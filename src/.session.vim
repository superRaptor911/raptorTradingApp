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
edit components/user/UserCoins.tsx
argglobal
let s:l = 95 - ((44 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 95
normal! 019|
tabnext 1
badd +38 components/CoinList.tsx
badd +37 pages/AdminLogin.tsx
badd +59 store.ts
badd +44 components/wazirx/tradingMenuMobile/TradingCoinListMobile.jsx
badd +1 types.ts
badd +27 components/UserList.tsx
badd +32 api/api.ts
badd +120 api/wazirxApi.ts
badd +91 pages/AddTransactions.tsx
badd +5 pages/wazirx/WazirxTradingMenuMobile.tsx
badd +24 pages/AddCoin.tsx
badd +3 pages/wazirx/Automation.tsx
badd +23 pages/wazirx/StopLossBot.tsx
badd +6 components/helper.ts
badd +85 components/wazirx/stopLossBot/RulesMenu.jsx
badd +62 components/user/UserTransactions.jsx
badd +62 components/wazirx/stopLossBot/RuleItem.jsx
badd +2 components/wazirx/tradingMenu/MarketGraph.jsx
badd +36 pages/Coin.tsx
badd +67 components/wazirx/tradingMenuMobile/WazirxTransactionsMobile.jsx
badd +82 components/wazirx/tradingMenu/Transactions.jsx
badd +19 components/wazirx/tradingMenu/TradingMenu.jsx
badd +72 components/wazirx/tradingMenuMobile/PlaceOrder.jsx
badd +13 components/wazirx/tradingMenuMobile/uiStore.js
badd +1 components/wazirx/tradingMenu/Wallet.jsx
badd +23 components/wazirx/WazirxAddTransaction.jsx
badd +35 components/summary/TotalInvestmentAndProfit.tsx
badd +30 pages/wazirx/WazirxDashboard.jsx
badd +24 components/user/UserFUndTransfers.jsx
badd +1 components/header/DrawerMenu.tsx
badd +46 components/wazirx/tradingMenu/WazirxCoinList.jsx
badd +30 components/Header.tsx
badd +1 routes.ts
badd +69 components/wazirx/WazirxTransactions.jsx
badd +3 components/hooks/useTimer.js
badd +12 pages/AddUser.tsx
badd +18 components/summary/TotalCoins.tsx
badd +1 pages/Summary.tsx
badd +80 pages/User.tsx
badd +13 App.jsx
badd +15 api/request.ts
badd +4 pages/Home.tsx
badd +3 utility.ts
badd +158 components/user/UserCoins.tsx
badd +4 components/hooks/useDeviceType.js
badd +8 components/Visibility.tsx
badd +34 pages/FundTransfer.tsx
badd +1 pages/AdminMenu.tsx
badd +81 pages/Transactions.tsx
badd +14 components/user/UserStats.jsx
badd +86 components/TableCustomPaginationAction.tsx
badd +37 pages/UserLogin.tsx
badd +41 components/wazirx/tradingMenuMobile/TradingMenu.jsx
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

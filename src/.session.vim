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
balt components/user/UserTransactions.tsx
let s:l = 50 - ((22 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 50
normal! 07|
tabnext 1
badd +89 components/wazirx/tradingMenu/Transactions.tsx
badd +1 pages/wazirx/WazirxDashboard.tsx
badd +32 components/wazirx/tradingMenuMobile/PlaceOrderMobile.tsx
badd +34 components/helper.ts
badd +22 components/wazirx/stopLossBot/RulesMenu.tsx
badd +38 components/CoinList.tsx
badd +37 pages/AdminLogin.tsx
badd +59 store.ts
badd +42 components/wazirx/tradingMenuMobile/TradingCoinListMobile.jsx
badd +1 types.ts
badd +27 components/UserList.tsx
badd +32 api/api.ts
badd +30 api/wazirxApi.ts
badd +91 pages/AddTransactions.tsx
badd +2 pages/wazirx/WazirxTradingMenuMobile.tsx
badd +24 pages/AddCoin.tsx
badd +3 pages/wazirx/Automation.tsx
badd +23 pages/wazirx/StopLossBot.tsx
badd +118 components/user/UserTransactions.tsx
badd +222 components/wazirx/stopLossBot/RuleItem.tsx
badd +20 components/wazirx/tradingMenu/MarketGraph.jsx
badd +36 pages/Coin.tsx
badd +55 components/wazirx/tradingMenuMobile/WazirxTransactionsMobile.jsx
badd +16 components/wazirx/tradingMenu/TradingMenu.tsx
badd +13 components/wazirx/tradingMenuMobile/uiStore.js
badd +8 components/wazirx/tradingMenu/Wallet.tsx
badd +35 components/summary/TotalInvestmentAndProfit.tsx
badd +18 components/user/UserFundTransfers.tsx
badd +1 components/header/DrawerMenu.tsx
badd +1 components/wazirx/tradingMenu/WazirxCoinList.tsx
badd +55 components/Header.tsx
badd +1 routes.ts
badd +3 components/hooks/useTimer.js
badd +12 pages/AddUser.tsx
badd +18 components/summary/TotalCoins.tsx
badd +1 pages/Summary.tsx
badd +69 pages/User.tsx
badd +56 App.jsx
badd +15 api/request.ts
badd +9 pages/Home.tsx
badd +3 utility.ts
badd +50 components/user/UserCoins.tsx
badd +4 components/hooks/useDeviceType.js
badd +8 components/Visibility.tsx
badd +34 pages/FundTransfer.tsx
badd +1 pages/AdminMenu.tsx
badd +34 pages/Transactions.tsx
badd +17 components/user/UserStats.tsx
badd +86 components/TableCustomPaginationAction.tsx
badd +37 pages/UserLogin.tsx
badd +28 components/wazirx/tradingMenuMobile/TradingMenu.jsx
badd +17 components/user/helper.ts
badd +22 components/user/UserCoinStats.tsx
badd +2 components/wazirx/tradingMenu/PlaceOrder.tsx
badd +15 components/wazirx/tradingMenu/WazirxTransactions.tsx
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

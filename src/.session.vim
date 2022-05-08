let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/program/react/vite/raptorTradingApp/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
set shortmess=aoO
badd +1 components/user/UserCoinStats.tsx
badd +60 components/user/UserCoins.tsx
badd +48 App.jsx
badd +34 components/header/DrawerMenu.tsx
badd +45 components/CoinList.tsx
badd +52 components/hooks/useDeviceType.ts
badd +5 main.jsx
badd +16 components/wazirx/tradingMenuMobile/PlaceOrderMobile.tsx
badd +74 components/coin/TradeRuleModal.tsx
badd +160 components/coin/StopLossBot4Coin.tsx
badd +2 components/wazirx/stopLossBot/RuleItem.tsx
badd +1 components/wazirx/stopLossBot/RulesMenu.tsx
badd +88 components/user/UserTradesGraph.tsx
badd +65 components/user/helper.ts
badd +62 components/wazirx/tradingMenu/PlaceOrder.tsx
badd +158 pages/Coin.tsx
badd +6 components/user/UserCoinNetWorthGraph.tsx
badd +93 pages/AddTransactions.tsx
badd +38 components/coin/IndicatorSelector.jsx
badd +82 components/coin/CoinGraph.jsx
badd +15 components/coin/PeriodSelector.jsx
badd +1 components/user/UserTransactions.tsx
badd +89 components/wazirx/tradingMenu/Transactions.tsx
badd +1 pages/wazirx/WazirxDashboard.tsx
badd +56 components/helper.ts
badd +37 pages/AdminLogin.tsx
badd +79 store.ts
badd +64 components/wazirx/tradingMenuMobile/TradingCoinListMobile.jsx
badd +1 types.ts
badd +79 components/UserList.tsx
badd +32 api/api.ts
badd +80 api/wazirxApi.ts
badd +62 pages/wazirx/WazirxTradingMenuMobile.tsx
badd +24 pages/AddCoin.tsx
badd +3 pages/wazirx/Automation.tsx
badd +16 pages/wazirx/StopLossBot.tsx
badd +69 components/wazirx/tradingMenu/MarketGraph.jsx
badd +119 components/wazirx/tradingMenuMobile/WazirxTransactionsMobile.jsx
badd +3 components/wazirx/tradingMenu/TradingMenu.tsx
badd +1 components/wazirx/tradingMenuMobile/uiStore.js
badd +8 components/wazirx/tradingMenu/Wallet.tsx
badd +35 components/summary/TotalInvestmentAndProfit.tsx
badd +55 components/user/UserFundTransfers.tsx
badd +1 components/wazirx/tradingMenu/WazirxCoinList.tsx
badd +67 components/Header.tsx
badd +19 routes.ts
badd +13 components/hooks/useTimer.ts
badd +12 pages/AddUser.tsx
badd +18 components/summary/TotalCoins.tsx
badd +1 pages/Summary.tsx
badd +40 pages/User.tsx
badd +15 api/request.ts
badd +42 pages/Home.tsx
badd +3 utility.ts
badd +6 components/Visibility.tsx
badd +34 pages/FundTransfer.tsx
badd +1 pages/AdminMenu.tsx
badd +34 pages/Transactions.tsx
badd +17 components/user/UserStats.tsx
badd +86 components/TableCustomPaginationAction.tsx
badd +37 pages/UserLogin.tsx
badd +31 components/wazirx/tradingMenuMobile/TradingMenu.jsx
badd +15 components/wazirx/tradingMenu/WazirxTransactions.tsx
badd +6 components/Loading.tsx
badd +96 components/coin/coinGraphHelper.js
badd +59 components/coin/CoinBuyMenu.tsx
badd +16 components/wazirx/stopLossBot/helper.ts
badd +2 pages/Leaderboard.tsx
badd +5 index.css
argglobal
%argdel
edit components/header/DrawerMenu.tsx
argglobal
balt pages/Home.tsx
let s:l = 51 - ((33 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 51
normal! 019|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :

let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/program/react/cucek-trading/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +23 App.js
badd +42 pages/MainPage.js
badd +100 components/Utility.js
badd +2 components/Header.js
badd +85 pages/AdminMenu.js
badd +179 pages/AddUser.js
badd +77 pages/AddCoin.js
badd +278 pages/AddTransaction.js
badd +6 components/TransactionTable.js
badd +98 components/CoinTable.js
badd +62 pages/EditUser.js
badd +1 pages/UserList.js
badd +1 components/UserCard.js
badd +171 pages/UserInfo.js
badd +32 pages/AdminLogin.js
badd +100 pages/EditTransactionMenu.js
badd +151 pages/TransferFund.js
badd +13 components/SideDrawer.js
badd +19 pages/TransactionHistory.js
badd +263 pages/CoinInfo.js
badd +285 pages/Company.js
badd +9 index.js
badd +12 components/AllTheCoins.js
badd +103 ~/program/react/cucek-trading/changes.log
badd +25 pages/TradingMenuPage.js
badd +134 pages/trading/LoginUser.js
badd +1 components/LoadingCircle.js
badd +49 components/trading/TabBar.js
badd +51 pages/trading/Market.js
badd +40 components/trading/MarketSymbols.js
badd +4 components/useFetch.js
badd +7 components/usePrevious.js
badd +14 components/trading/SymbolHistory.js
badd +50 components/UserTable.js
badd +55 components/trading/CoinTransaction.js
argglobal
%argdel
edit pages/trading/Market.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
let s:l = 36 - ((35 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
36
normal! 0
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :

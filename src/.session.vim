let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/program/react/cucek-trading/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +53 App.js
badd +19 pages/MainPage.js
badd +127 components/Utility.js
badd +2 components/Header.js
badd +94 components/CoinTable.js
badd +3 pages/UserList.js
badd +1 components/UserCard.js
badd +4 pages/UserInfo.js
badd +3 pages/EditTransactionMenu.js
badd +13 components/SideDrawer.js
badd +7 pages/CoinInfo.js
badd +2 pages/Company.js
badd +9 index.js
badd +12 components/AllTheCoins.js
badd +103 ~/program/react/cucek-trading/changes.log
badd +25 pages/TradingMenuPage.js
badd +1 components/LoadingCircle.js
badd +91 components/UserTable.js
badd +18 components/hooks/useFetch.js
badd +49 components/hooks/useInvestmentData.js
badd +1 components/UserDetails.js
badd +116 components/UserTransactionTable.js
badd +138 components/UserCoinsTable.js
badd +56 components/hooks/useUserCoinData.js
badd +10 components/hooks/useServerResponse.js
badd +46 components/UserWalletTable.js
badd +98 components/UserFundTransferTable.js
badd +17 components/hooks/useCoinPriceData.js
argglobal
%argdel
edit components/hooks/useCoinPriceData.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
let s:l = 12 - ((11 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
12
normal! 019|
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

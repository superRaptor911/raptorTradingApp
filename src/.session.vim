let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/program/react/cucek-trading/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +85 App.js
badd +20 pages/MainPage.js
badd +62 pages/Login.js
badd +2 components/Utility.js
badd +57 components/Header.js
badd +85 pages/AdminMenu.js
badd +179 pages/AddUser.js
badd +77 pages/AddCoin.js
badd +190 pages/AddTransaction.js
badd +6 components/TransactionTable.js
badd +102 components/CoinTable.js
badd +56 pages/EditUser.js
badd +1 pages/UserList.js
badd +1 components/UserCard.js
badd +85 pages/UserInfo.js
badd +32 pages/AdminLogin.js
badd +100 pages/EditTransactionMenu.js
badd +151 pages/TransferFund.js
badd +48 components/SideDrawer.js
badd +3 pages/Policy.js
badd +19 pages/TransactionHistory.js
badd +278 pages/CoinInfo.js
badd +377 pages/Company.js
badd +24 pages/DatabaseQuery.js
badd +9 index.js
badd +12 components/AllTheCoins.js
badd +107 ~/program/react/cucek-trading/changes.log
argglobal
%argdel
edit pages/Company.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
let s:l = 378 - ((29 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
378
normal! 07|
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

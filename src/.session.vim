let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/program/react/cucek-trading/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +59 App.js
badd +20 pages/MainPage.js
badd +62 pages/Login.js
badd +2 components/Utility.js
badd +48 components/Header.js
badd +85 pages/AdminMenu.js
badd +86 pages/AddUser.js
badd +77 pages/AddCoin.js
badd +112 pages/AddTransaction.js
badd +90 components/TransactionTable.js
badd +71 components/CoinTable.js
badd +56 pages/EditUser.js
badd +1 pages/UserList.js
badd +1 components/UserCard.js
badd +559 pages/UserInfo.js
badd +32 pages/AdminLogin.js
badd +100 pages/EditTransactionMenu.js
badd +112 pages/TransferFund.js
badd +58 components/SideDrawer.js
badd +3 pages/Policy.js
badd +22 pages/TransactionHistory.js
badd +87 pages/CoinInfo.js
argglobal
%argdel
edit components/CoinTable.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
let s:l = 95 - ((24 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
95
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

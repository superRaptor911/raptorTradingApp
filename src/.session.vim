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
edit pages/Summary.jsx
argglobal
balt components/UserList.jsx
let s:l = 7 - ((6 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 0
tabnext 1
badd +111 components/user/UserTransactions.jsx
badd +79 pages/User.jsx
badd +22 App.jsx
badd +44 store.js
badd +55 api/api.js
badd +65 components/UserList.jsx
badd +1 components/CoinList.jsx
badd +17 api/request.js
badd +3 components/hooks/useTimer.js
badd +9 routes.js
badd +14 pages/Home.jsx
badd +38 components/Header.jsx
badd +7 pages/Summary.jsx
badd +33 components/summary/TotalInvestmentAndProfit.jsx
badd +43 components/header/DrawerMenu.jsx
badd +5 utility.js
badd +158 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +47 pages/AddTransations.jsx
badd +31 pages/FundTransfer.jsx
badd +43 pages/AdminMenu.jsx
badd +18 pages/AdminLogin.jsx
badd +1 pages/Transactions.jsx
badd +25 components/user/UserStats.jsx
badd +106 components/user/UserFUndTransfers.jsx
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
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :

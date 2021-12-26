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
edit ~/program/react/vite/raptorTradingApp/src/components/user/UserTransactions.jsx
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
exe 'vert 3resize ' . ((&columns * 45 + 87) / 174)
argglobal
balt pages/Transactions.jsx
let s:l = 97 - ((32 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 97
normal! 0
wincmd w
argglobal
enew
balt ~/program/react/vite/raptorTradingApp/src/components/user/UserTransactions.jsx
wincmd w
argglobal
enew
balt ~/program/react/vite/raptorTradingApp/src/components/user/UserTransactions.jsx
wincmd w
exe '2resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 2resize ' . ((&columns * 1 + 87) / 174)
exe '3resize ' . ((&lines * 1 + 23) / 47)
exe 'vert 3resize ' . ((&columns * 45 + 87) / 174)
tabnext 1
badd +32 App.jsx
badd +44 store.js
badd +64 api/api.js
badd +101 components/UserList.jsx
badd +92 components/CoinList.jsx
badd +17 api/request.js
badd +3 components/hooks/useTimer.js
badd +9 routes.js
badd +8 pages/Home.jsx
badd +38 components/Header.jsx
badd +7 pages/Summary.jsx
badd +33 components/summary/TotalInvestmentAndProfit.jsx
badd +43 components/header/DrawerMenu.jsx
badd +5 utility.js
badd +70 pages/User.jsx
badd +158 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +47 pages/AddTransations.jsx
badd +31 pages/FundTransfer.jsx
badd +43 pages/AdminMenu.jsx
badd +18 pages/AdminLogin.jsx
badd +1 pages/Transactions.jsx
badd +85 components/user/UserStats.jsx
badd +97 ~/program/react/vite/raptorTradingApp/src/components/user/UserTransactions.jsx
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

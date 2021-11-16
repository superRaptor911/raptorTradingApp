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
badd +32 App.jsx
badd +10 store.js
badd +71 api/api.js
badd +101 components/UserList.jsx
badd +86 components/CoinList.jsx
badd +17 api/request.js
badd +3 components/hooks/useTimer.js
badd +9 routes.js
badd +8 pages/Home.jsx
badd +39 components/Header.jsx
badd +7 pages/Summary.jsx
badd +33 components/summary/TotalInvestmentAndProfit.jsx
badd +43 components/header/DrawerMenu.jsx
badd +1 utility.js
badd +61 pages/User.jsx
badd +62 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +47 pages/AddTransations.jsx
badd +31 pages/FundTransfer.jsx
badd +43 pages/AdminMenu.jsx
badd +26 pages/AdminLogin.jsx
badd +138 pages/Transactions.jsx
argglobal
%argdel
edit pages/Transactions.jsx
argglobal
balt components/CoinList.jsx
let s:l = 134 - ((18 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 134
normal! 09|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0&& getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
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

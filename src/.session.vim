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
badd +22 App.jsx
badd +17 store.js
badd +25 api/api.js
badd +6 index.css
badd +72 components/UserList.jsx
badd +10 components/CoinList.jsx
badd +13 api/request.js
badd +3 components/hooks/useTimer.js
badd +4 routes.js
badd +8 pages/Home.jsx
badd +29 components/Header.jsx
badd +7 pages/Summary.jsx
badd +33 components/summary/TotalInvestmentAndProfit.jsx
badd +44 components/header/DrawerMenu.jsx
badd +1 utility.js
badd +34 pages/User.jsx
badd +20 components/user/UserCoins.jsx
argglobal
%argdel
edit pages/User.jsx
argglobal
balt components/user/UserCoins.jsx
let s:l = 37 - ((36 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 37
normal! 047|
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

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
badd +29 App.jsx
badd +13 store.js
badd +18 api/api.js
badd +101 components/UserList.jsx
badd +104 components/CoinList.jsx
badd +13 api/request.js
badd +3 components/hooks/useTimer.js
badd +6 routes.js
badd +8 pages/Home.jsx
badd +29 components/Header.jsx
badd +7 pages/Summary.jsx
badd +33 components/summary/TotalInvestmentAndProfit.jsx
badd +26 components/header/DrawerMenu.jsx
badd +1 utility.js
badd +61 pages/User.jsx
badd +62 components/user/UserCoins.jsx
badd +4 components/hooks/useDeviceType.js
badd +5 components/Visibility.jsx
badd +1 pages/AddTransations.jsx
badd +39 pages/FundTransfer.jsx
argglobal
%argdel
edit api/api.js
argglobal
balt api/request.js
let s:l = 4 - ((3 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 035|
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

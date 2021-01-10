document.addEventListener('DOMContentLoaded', function () {
  //nav menu
  const menu = () => document.querySelector('.side-menu');
  M.Sidenav.init(menu(), { edge: 'right' });
  //add task form
  const form = () => document.querySelector('.side-form');
  M.Sidenav.init(form(), { edge: 'left' });
});

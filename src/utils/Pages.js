
const Pages = new Map();
Pages.set('home', { name: 'Main', path: '/', anchorable: true });
Pages.set('about', { name: 'NotFound', path: '/about', anchorable: true });
Pages.set('menu', { name: 'NotFound', path: '/menu', anchorable: true });
Pages.set('reservations', {
  name: 'Reservations',
  path: '/reservations',
  anchorable: true
});
// Pages.set('confirmedBooking', {
//   name: 'Confirmed Booking',
//   path: '/confirmed-booking',
//   anchorable: false
// });
Pages.set('orders', {
  name: 'Order Online',
  path: '/orders',
  anchorable: true
});
Pages.set('login', { name: 'Login', path: '/login', anchorable: true });

export default Pages;
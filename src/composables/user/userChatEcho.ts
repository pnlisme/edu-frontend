// src/plugins/echo.js
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Cookies from 'js-cookie'

Pusher.logToConsole = true

// window.Pusher = Pusher;
;(window as any).Pusher = Pusher as any

const echo = new Echo({
  broadcaster: 'pusher',
  key: '8256c6371e0fc8e2d463',
  cluster: 'ap1',
  // forceTLS: true,
  encrypted: true,
  authEndpoint: 'https://toannt.id.vn/public/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${Cookies.get('token_user_edu')}`
    }
  }
})

export default echo

// import { withAuth } from 'next-auth/middleware'
import { auth } from './auth'

// export default withAuth({
//   pages: {
//     signIn: '/login',
//   },
// })

// export { auth as middleware } from './auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  console.log('ROUTE: ', req.nextUrl.pathname)
  console.log('IS LOGGED IN: ', isLoggedIn)
})

export const config = {
  matcher: ['/users/:path*', '/conversations/:path*'],
}

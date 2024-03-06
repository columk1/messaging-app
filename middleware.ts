// import { withAuth } from 'next-auth/middleware'

// export default withAuth({
//   pages: {
//     signIn: '/login',
//   },
// })

export { auth as middleware } from './app/lib/auth'

export const config = {
  matcher: ['/users/:path*', '/conversations/:path*'],
}

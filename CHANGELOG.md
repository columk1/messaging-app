## Changelog

### Added
- Implement server-side validation and sanitization of data using Zod
- Add contact list feature
- Add usernames
- Create settings pages
- Create dedicated auth routes
- Add custom styling via props for improved chat UX
- Improve UX with loading fallbacks
- Build out error handling with more error states and feedback from interactions
- Allow users to create new named conversations with users they are already chatting to
- Create script to add multiple users with contacts and media-rich conversations to the database
- Add a demo account login function to test the app quickly

### Changed
- Replace noSQL database with relational database
- Replace packages with custom solutions (react-hook-form, axios, react-loading-skeleton, react-spinners)
- Redesign messaging interface 
- Replace deprecated configuration option "domains"

### Removed
- Remove unrequired packages (superjson, next-superjson-plugin)
- Remove redundant markup

### Fixed
- Settings not accessible on small screens
- Conversation not sorting correctly when updated
- Overuse of otherUser and useConversation hooks causing components to be rendered on the client unnecessarily
- Conversation members not redirected when conversation is deleted
- User not re-directed when creating a new group chat
- Existing chat returned when a new group chat is created with a user from a previous chat
- Profile drawer closes on first click of modal
- Redundant markup elements and CSS classes
- Users able to post messages to conversations they are not part of
- Conversations accessible by unauthorized users
- Numerous other small bugs related to UI behaviour and data-ordering
- Numerous other cases of over-fetching, extraneous data transmission and poor data security and privacy

### Performance

- Optimize API routes and server actions to enhace security and performance
- Reduce data payloads sent to the client to improve data privacy and performance
- Minimize database round trips by utilizing session data and improving query language
- Minimize data-fetching by lifting state and utilizing context where appropriate
- Reduce the number of re-renders by limiting the use of hooks and improving state management
- Reduce the number of client rendered components
- Transition to more complex layouts to allow more server-side rendering and to enable more specific loading states to only affect dynamic sections or individual components

### Security
- Protect API routes
- Minimize user data sent to the client
- Replace public email address with username
- Validate and sanitize data sent from client
- Tighten user permissions and controls on data access

### Accessibility

- Replace markup with more semantic html
- Replace clickable divs with button or link elements
- Add text for screen readers to describe icon-only buttons
- Replace single auth route with login and register routes to support external links
- Add image placeholders
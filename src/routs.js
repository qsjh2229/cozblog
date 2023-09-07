import ListPage from "./pages/ListPage"
import ShowPage from "./pages/ShowPage"
import EditPage from "./pages/EditPage"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import BlogForm from "./components/BlogForm"
const routs = [
   { path: "/", component: <HomePage /> },
   { path: "/blog", component: <ListPage /> },
   { path: "/admin", component: <AdminPage /> },
   { path: "/blog/create", component: <BlogForm /> },
   { path: "/blog/:id/edit", component: <EditPage /> },
   { path: `/blog/:id`, component: <ShowPage /> },
]
export default routs

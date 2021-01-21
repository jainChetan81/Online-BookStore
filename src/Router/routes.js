import Dashboard from "../Container/Dashboard";
import Checkout from "../Container/Checkout";
const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        layout: "/",
    },
    {
        path: "checkout",
        name: "Checkout",
        component: Checkout,
        layout: "/",
    },
];
export default routes;

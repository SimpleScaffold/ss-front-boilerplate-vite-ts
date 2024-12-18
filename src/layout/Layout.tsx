import {Outlet} from "react-router";
import SSlayout from "@/layout/components/SSlayout.tsx";

const Layout = () => {
    return (
        <SSlayout>
            <Outlet />
        </SSlayout>
    );
};

export default Layout;
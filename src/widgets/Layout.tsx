import {Outlet} from "react-router";
import SSlayout from "@/widgets/layout/SSlayout.tsx";

const Layout = () => {
    return (
        <SSlayout>
            <Outlet />
        </SSlayout>
    );
};

export default Layout;
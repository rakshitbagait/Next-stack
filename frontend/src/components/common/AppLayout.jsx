import TopNavbar from "./TopNavbar";
import NavMenu from "./NavMenu";

const AppLayout = ({ children }) => {

    return (

        <div className="app-layout">

            <TopNavbar />

            <div className="app-body">

                <NavMenu />

                <main className="app-content">
                    {children}
                </main>

            </div>

        </div>

    );

};

export default AppLayout;
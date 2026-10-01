import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import Loading from "../components/common/Loading";

function MainLayout() {
    return (
        <div className="app-shell">
            <ScrollToTop />
            <Header />
            <main className="main container">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
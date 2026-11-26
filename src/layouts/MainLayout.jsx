import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import ContingencyBanner from "../components/layout/ContingencyBanner";
import Loading from "../components/common/Loading";

function MainLayout() {
    const { pathname } = useLocation();

    return (
        <div className="app-shell">
            <ScrollToTop />
            <Header />
            <ContingencyBanner />
            <main className="main container">
                {/* A key reinicia a transição curta a cada troca de página */}
                <div key={pathname} className="page-turn">
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;

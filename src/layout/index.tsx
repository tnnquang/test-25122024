import { Fragment, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

export default function RootLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <Fragment>
            <Header />
            <main id="main-container" className="container-wrapper">
                {children}
            </main>
            <Footer />
        </Fragment>
    );
}

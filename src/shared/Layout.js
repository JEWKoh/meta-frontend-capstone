import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main data-testid="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
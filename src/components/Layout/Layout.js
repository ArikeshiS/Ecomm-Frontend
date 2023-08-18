import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author}/>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "74vh" }}>{children}</main>
      <ToastContainer/>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Shop Now - Hidden Brand",
  description: "Best Brand for you",
  keywords: "",
  author: "Arikeshi Group"
}

export default Layout;

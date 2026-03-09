
import css from "././Home.module.css";

const NotFound = () => {
    return (
        <div>
       <h1 className={css.title}>404 - Page not found</h1>
       <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}

export const metadata = {
  title: "Page not found - 404",
  description: "The page you are searching doesn`t exist",
  url: "https://notehub.com/not-found",
  openGraph: {
    title: "Page not found - 404",
    description: "The page you are searching doesn`t exis",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "404 - page not found",
      },
    ],
  },
};


export default NotFound;
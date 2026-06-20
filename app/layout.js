import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import Nav from "../components/Nav";


export const metadata = {
  title: "Apex.One — F1 Data, Decoded",
  description: "Live Formula 1 standings, circuits, and telemetry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <CustomCursor />
        <Nav />
        {children}
       
      </body>
    </html>
  );
}
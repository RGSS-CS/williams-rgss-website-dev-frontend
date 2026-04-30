import Navbar from "@/app/_ui/navbar";
import Footer from "@/app/_ui/footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}
export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <body>
            {children}
        </body>
    )
}
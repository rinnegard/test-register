import Link from "next/link";

const pages = [
    {
        href: "/",
        name: "Home",
    },
    {
        href: "/register",
        name: "Register",
    },
    {
        href: "/signin",
        name: "Sign in",
    },
];

export default function Header() {
    return (
        <header className="bg-blue-300 h-15 p-2">
            <nav>
                <ul className="flex gap-2">
                    {pages.map((page) => {
                        return (
                            <li key={page.href}>
                                <Link
                                    className="p-2 hover:bg-blue-200 hover:rounded-lg"
                                    href={page.href}
                                >
                                    {page.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}

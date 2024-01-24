import Link from "next/link"
import Image from "next/image";

import logo1 from "@/public/Logo-01.jpg";
import logo2 from "@/public/Logo-02.jpg";

/**
 * Represents a header component to be used on every page.
 * Consists of a header link to the home page, menu page, sign in page, and cart page.
 * @returns A header component
 */
export default function Header() {
    return (
        <HeaderLayout>
            <LeftSection />
            <MiddleSection />
            <RightSection />
        </ HeaderLayout>
    )
}

/**
 * Represents the right section of the header component.
 * @returns The right section of the header component
 */
function RightSection() {
    return (
        <div className="flex flex-row gap-4">
                <HeaderLink href="/sign-in">Sign in</HeaderLink>
                <HeaderLink href="/cart">Cart</HeaderLink>
            </div>
    )
}

/**
 * Represents the middle section of the header component.
 * @returns The middle section of the header component
 */
function MiddleSection() {
    return (
        <div className="flex flex-row gap-4">
                <HeaderLink href="/">Home</HeaderLink>
                <HeaderLink href="/menu">Menu</HeaderLink>
            </div>
    )
}

/**
 * Represents the left section of the header component.
 * @returns The left section of the header component
 */
function LeftSection() {
    return (
        <div className="flex flex-row items-center">
                <Link href={"/"} className="rounded-full">
                    <Image src={logo1} alt="Logo" width={100} height={100} className="rounded-full shadow-lg"/>
                </Link>
        </div>
    )
}

/**
 * A header layout component
 * @param {String} children The tree to display within the header component
 * @returns A header layout component
 */
function HeaderLayout({children}) {
    return <header className="flex gap-4 justify-between relative py-4 px-6 items-center shadow-xl">
        {children}
    </header>
}

/**
 * Represents a header link to be used in the header component. 
 * Takes in a href and children prop.
 * @param {String} href The file path for the header link
 * @param {String} children The text to display for the header link 
 * @param {String} className The class name for the header link, alters the styling
 * @returns A header link component
 */
function HeaderLink({href, children, className}) {
    return (
        <Link href={href}
              className={`text-2xl font-bold text-gray-700 ${className}`}>
            {children}
        </Link>
    )
}
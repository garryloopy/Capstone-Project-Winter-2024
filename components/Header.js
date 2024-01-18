import Link from "next/link"

/**
 * Header component
 * @returns 
 */
export default function Header() {
    return (
        <div>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
        </div>
    )
}
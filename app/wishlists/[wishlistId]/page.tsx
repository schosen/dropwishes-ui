export async function generateStaticParams() {
	const wishlists = await fetch('https://.../wishlists').then((res) => res.json())

	return wishlists.map((wishlist) => ({
		id: wishlist.id,
	}))
}
export default async function WishlistPage({ params }) {
	const { id } = params


    return(
        <></>
    )

}

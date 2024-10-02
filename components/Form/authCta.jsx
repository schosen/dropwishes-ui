import utilStyles from "../../styles/utils.module.css";
import authCtaStyles from "../../styles/AuthCTA.module.css";
import Image from "next/image";

export default function AuthCTA() {
	return (
		<section className={authCtaStyles.sectionAuthCTA}>
			<article className={authCtaStyles.articleAuthCTA}>
				<Image
					className={authCtaStyles.imageAuthCTA}
					src="/images/icon-thank-you.svg"
					alt=""
					aria-hidden="true"
					width={56}
					height={56}
				/>
				<h1
					className={`${utilStyles.title} ${utilStyles.colorText} ${authCtaStyles.margins}`}
				>
					Sign up or Log in
				</h1>
				<p className={utilStyles.description}>
					Sign Up or Log In to save your wishlist. Don't worry we'll save the wishlist you've just created to your account once you authenticate.
				</p>
			</article>
		</section>
	);
}

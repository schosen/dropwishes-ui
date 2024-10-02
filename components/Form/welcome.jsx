import utilStyles from "../../styles/utils.module.css";
import authCtaStyles from "../../styles/AuthCTA.module.css";
import formStyles from "../../styles/Form.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Welcome({handleFormToggle}) {
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
					Welcome to Dropwishes
				</h1>
				<p className={utilStyles.description}>
					Build wishlists for any occasion! Share with family, friends and colleagues! Start now and drop your wishes!
				</p>

				<button onClick={handleFormToggle} className={`${formStyles.bottomButton}`}>
        			Create wishlist
      			</button>
				<p className={`${utilStyles.sideLink}`}> Skip this and <Link href="/auth/login" > Log In/ </Link> <Link href="/auth/signup" > Sign Up </Link></p>

			</article>
		</section>
	);
}

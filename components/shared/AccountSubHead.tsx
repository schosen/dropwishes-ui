import React, { FC, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export interface AccountSubHeadProps {
	username?: string,
	email?: string
}

const AccountSubHead: FC<AccountSubHeadProps> = ({
	username = "Sarah Smith",
	email = "sarahsmith@example.com"

}) => {
  // const { user, fetchUser } = useUser();

  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

	return (
		<>
			{/* {console.log("USER = ",user)} */}
			<span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
				<span className="text-slate-900 dark:text-slate-200 font-semibold">
					{username},
				</span>{" "}
				{email} · Dropwishes User
			</span>
		</>
	)
}

export default AccountSubHead

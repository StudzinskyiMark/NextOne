import Link from 'next/link';
import { buttonVariants } from '../ui/button';

export function Navbar() {
	return (
		<nav className="w-full py-5 flex items-center justify-between">
			<div className="flex items-center gap-6">
				<Link href="/">
					<h1 className="text-2xl font-bold">
						Next<span className="text-emerald-600">One</span>
					</h1>
				</Link>

				<div className="flex items-center gap-4">
					<Link className={buttonVariants({ variant: 'ghost' })} href="/">
						Home
					</Link>
					<Link
						className={buttonVariants({ variant: 'ghost' })}
						href="/blog">
						Blog
					</Link>
					<Link
						className={buttonVariants({ variant: 'ghost' })}
						href="/create">
						Create
					</Link>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href="/auth/sign-in">
					Sign In
				</Link>
				<Link
					className={buttonVariants({ variant: 'default' })}
					href="/auth/sign-up">
					Sign Up
				</Link>
			</div>
		</nav>
	);
}

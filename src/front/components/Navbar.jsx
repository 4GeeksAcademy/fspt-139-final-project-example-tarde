import { Link } from "react-router-dom";

export const Navbar = () => {

	return (

		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">

			<div className="container">

				<Link
					className="navbar-brand"
					to="/"
				>
					Git Team Demo
				</Link>

				<div className="navbar-nav">

					<Link
						className="nav-link"
						to="/"
					>
						Home
					</Link>

					<Link
						className="nav-link"
						to="/team"
					>
						Team
					</Link>
					<Link
						className="nav-link"
						to="/tasks"
					>
						Tasks
					</Link>

				</div>

			</div>

		</nav>

	);
};
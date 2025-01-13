export { Page };

import { Counter } from "./Counter";
import style from "./style.module.scss"

function Page() {
	return (
		<>
			<h1 className={ style.a }>Hello from Vike on NestJS!</h1>
			This page is:
			<ul>
				<li>Rendered to HTML.</li>
				<li>
					Interactive. <Counter />
				</li>
			</ul>
		</>
	);
}
